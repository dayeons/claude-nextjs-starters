"use client"

import { TriangleAlert } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 계정 삭제 등 위험 작업 영역 — ConfirmDialog 사용 예시
export function DangerZone() {
  return (
    <Card className="border-destructive/40">
      <CardHeader>
        <CardTitle>위험 구역</CardTitle>
        <CardDescription>이 작업은 되돌릴 수 없습니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>계정 삭제</AlertTitle>
          <AlertDescription>
            계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다.
          </AlertDescription>
        </Alert>
        <ConfirmDialog
          trigger={<Button variant="destructive">계정 삭제</Button>}
          title="정말 계정을 삭제하시겠습니까?"
          description="삭제된 계정과 데이터는 복구할 수 없습니다."
          confirmText="삭제"
          destructive
          onConfirm={() => toast.error("계정 삭제 로직을 연결하세요.")}
        />
      </CardContent>
    </Card>
  )
}
