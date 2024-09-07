import { Header } from "../header";
import { Container } from "../container";
import { NavBar } from "../nav-bars";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPlayer } from "../../features/player/playerSlice";
import { Player } from "../player";
import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";

export const Layout: React.FC = React.memo(() => {
  const player = useAppSelector(selectPlayer);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!player.nickname) {
      setIsExiting(true);
    } else {
      setIsExiting(false);
    }
  }, [player.nickname]);

  return (
    <>
      <Header />
      <Container>
        <Card className="flex-2 h-fit bg-transparent">
          <NavBar />
        </Card>

        <Card className="flex-1 w-[825px]">
          <Outlet />
        </Card>

        <div className="flex-2 w-[270px] h-fit">
          {player.nickname ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <Player isExiting={isExiting} />
            </motion.div>
          ) : (
            <div className="!w-[270px] !h-[496px]" />
          )}
        </div>
      </Container>
    </>
  );
});
