import React from "react"
import { PageContainer } from "../../components/page-container"
import { PageHeader } from "../../components/page-header"

const TgBot: React.FC = React.memo(() => {
  return (
    <PageContainer>
      <PageHeader title="Telegram Bot" />
      <div className="relative h-[100%] grid m-4 mt-0 gap-2">
        <div className="grid grid-cols-2 gap-4 items-center mt-2">
          <div className="flex flex-col w-[342px] h-[310px] rounded-lg p-8 pl-4 pt-5">
            <p className="text-2xl flex-2 mb-4">Default helper</p>
            <p className="grid flex-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap the leap the
              leap the leap
            </p>
          </div>
          <div className="flex items-center justify-center bg-primary-500 rounded-lg px-8 mx-6 py-[130px]">
            Default heplper img
          </div>
        </div>

        <div className="grid  grid-cols-2 gap-4 items-center mb-4">
          <div className="flex flex-col w-[342px] h-[310px]  rounded-lg p-8 pl-4 pt-5">
            <p className="text-2xl flex-2 mb-4">Quick helper</p>
            <p className="grid flex-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap the leap the
              leap the leap
            </p>
          </div>
          <div className="flex items-center justify-center bg-primary-300 rounded-lg px-4 mx-6 py-[130px]">
            Quick heplper img
          </div>
        </div>
      </div>
    </PageContainer>
  )
})

export default TgBot