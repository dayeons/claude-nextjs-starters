import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { DangerZone } from "@/components/features/settings/danger-zone"
import { ProfileForm } from "@/components/features/settings/profile-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = { title: "설정" }

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="설정" description="계정과 서비스 환경을 관리합니다." />
      <Tabs defaultValue="profile" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="profile">프로필</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="account">계정</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>알림 설정 화면을 구성하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <Empty className="border">
                <EmptyHeader>
                  <EmptyTitle>아직 알림 설정이 없습니다</EmptyTitle>
                  <EmptyDescription>
                    Empty 컴포넌트로 빈 상태를 표시하는 예시입니다.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="mt-4">
          <DangerZone />
        </TabsContent>
      </Tabs>
    </>
  )
}
