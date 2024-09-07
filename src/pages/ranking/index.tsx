import { useContext, useEffect, useRef, useState } from "react";
import {
  useAsyncList,
  type AsyncListLoadOptions,
  type AsyncListStateUpdate,
} from "@react-stately/data";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  Input,
} from "@nextui-org/react";
import { PageContainer } from "../../components/page-container";
import { PageHeader } from "../../components/page-header";
import { formatNumber } from "../../utils/formatNumberUtils";
import { RegionSelect } from "../../components/region-select";
import { useAppDispatch } from "../../app/hooks";
import { fetchPlayer } from "../../features/player/playerThunks";
import { ThemeContext } from "../../components/theme-provider";
import { fetchRankingData } from "../../app/services/rankingApi";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { CountrySelect } from "../../components/country-select";
import { ArrowUpIcon } from "../../components/icons/arrow-up-icon";
import { RankBadge } from "../../components/icons/rank-badge";
import { CountryFlagIcon } from "../../components/icons/сountry-flag-icon";
import { LevelIndicator } from "../../components/icons/level-Indicator";

interface RankingItem {
  player_id: string;
  nickname: string;
  country: string;
  position: number;
  faceit_elo: number;
  game_skill_level: number;
}

 const Ranking: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [region, setRegion] = useState("EU");
  const [country, setCountry] = useState("");
  const [rankOffset, setRankOffset] = useState(0);
  const [tableKey, setTableKey] = useState(0);
  const [reloadOnInput, setReloadOnInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();
  const prevRegion = useRef(region);
  const prevCountry = useRef(country);

  const { theme } = useContext(ThemeContext);
  const loadingColor = theme === "light" ? "default" : "white"

  const list = useAsyncList<RankingItem>({
    async load({
      signal,
      cursor,
    }: AsyncListLoadOptions<RankingItem, string>): Promise<AsyncListStateUpdate<RankingItem, string>> {
      setIsLoading(true);
      try {
        const json = await fetchRankingData({
          region,
          country,
          rankOffset,
          cursor,
          signal,
        });
  
        const newOffset = rankOffset + json.items.length;
        setRankOffset(json.items.length > 0 ? newOffset : rankOffset);
        setHasMore(json.items.length === 40);
  
        return {
          items: json.items,
          cursor: json.items.length === 40
            ? `http://localhost:7777/api/ranking/region?region=${region}&country=${country}&rank=${newOffset}`
            : undefined,
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error loading data");
        } else {
          console.error("Unknown error occurred");
        }
        return { items: [], cursor: undefined };
      } finally {
        setIsLoading(false);
      }
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: async () => {
      if (hasMore && !isLoading) {
        try {
          await list.loadMore();
        } catch (error) {
          console.error("Error loading more data:", error);
        }
      }
    },
  });

  useEffect(() => {
    if (prevRegion.current !== region || prevCountry.current !== country) {
      prevRegion.current = region;
      prevCountry.current = country;
      setRankOffset(0);
      list.reload();
    }
  }, [region, country, list]);

  const handleRegionChange = (value: string) => {
    if (value) {
      setRegion(value);
      setRankOffset(0);
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setRankOffset(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleRankInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newRankOffset = parseInt(inputValue, 10);
      if (!isNaN(newRankOffset)) {
        setRankOffset(newRankOffset);
        setReloadOnInput(true);

        const player = list.items.find(item => item.position === newRankOffset);
        if (player) {
          handleRowClick(player.nickname);
        }
      }
      setInputValue("");
    }
  };

  useEffect(() => {
    if (reloadOnInput) {
      list.reload();
      setReloadOnInput(false);
    }
  }, [reloadOnInput, list, rankOffset]);

  const handleRowClick = (nickname: string) => {
    dispatch(fetchPlayer(nickname));
  };

  const handleScrollUp = () => {
    setTableKey(prevKey => prevKey + 1);
  };

  return (
    <PageContainer>
        <PageHeader title="Ranking" />

      <div className="grid grid-cols-3 mb-7 gap-4">
        <Input
          type="number"
          min="1"
          max="500000"
          placeholder="Enter rank"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleRankInput}
          aria-label="Rank offset input"
          className="shadow-md rounded-xl"
        />
        <RegionSelect value={region} onChange={handleRegionChange} />
        <CountrySelect value={country} onChange={handleCountryChange} />
      </div>
      <div
        className="h-full relative"
        ref={scrollerRef as React.RefObject<HTMLDivElement>}
      >
        <button
          onClick={handleScrollUp}
          className={`absolute right-[60px] bottom-[75px] z-10`}
          aria-label="Scroll up"
        >
          <ArrowUpIcon
            className={`w-[40px] h-[40px] transition-all p-1.5 transition-theme ${theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-700 opacity-90'} hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg`}
          />
        </button>
        <Table
          key={tableKey}
          isHeaderSticky
          aria-label="Ranking table with infinite pagination"
          selectionMode="single"
          bottomContent={
            hasMore && (
              <div className="flex justify-center">
                <Spinner
                  ref={loaderRef}
                  role="status"
                  aria-live="polite"
                  className="text-default"
                  color={loadingColor}
                />
              </div>
            )
          }
          classNames={{
            base: "max-h-[600px]",
            table: "min-h-[300px]",
            wrapper: "overflow-y-auto scroll-rounded rounded-none shadow-none p-0 pr-1 w-full bg-inherit",
            th: "dark:text-zinc-300 text-zinc-900 overflow-y-visible max-w-[693px]",
            td: "cursor-pointer",
          }}
        >
          <TableHeader>
            <TableColumn
              key="position"
              className="flex items-center justify-center p-0 text-base"
            >
              {country && <CountryFlagIcon country={country} />}
              Ranking
            </TableColumn>
            <TableColumn key="nickname" className="pl-8 text-base">
              Player
            </TableColumn>
            <TableColumn key="game_skill_level" className="px-0 text-base">
              Skill level
            </TableColumn>
            <TableColumn key="faceit_elo" className="text-base">
              ELO
            </TableColumn>
          </TableHeader>
          <TableBody items={list.items} loadingContent={<Spinner color={loadingColor} role="status" aria-live="polite" />}>
            {item => (
              <TableRow
                key={item.player_id}
                onClick={() => handleRowClick(item.nickname)}
                className="transition-all"
              >
                {columnKey => {
                  switch (columnKey) {
                    case "position":
                      return (
                        <TableCell className="flex justify-center min-h-[50px]">
                          <RankBadge rank={item.position} />
                        </TableCell>
                      );
                    case "nickname":
                      return (
                        <TableCell>
                          <div className="flex gap-2">
                            {item.country && <CountryFlagIcon country={item.country} />}
                            <span className="font-bold">{item.nickname}</span>
                          </div>
                        </TableCell>
                      );
                    case "game_skill_level":
                      return (
                        <TableCell>
                          <LevelIndicator level={item.game_skill_level} />
                        </TableCell>
                      );
                    case "faceit_elo":
                      return (
                        <TableCell className="font-medium">
                          {formatNumber(item.faceit_elo)}
                        </TableCell>
                      );
                    default:
                      return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                  }
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
};

export default Ranking
