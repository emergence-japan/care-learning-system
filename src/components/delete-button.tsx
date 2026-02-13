"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  deleteCorporation, 
  deleteFacility, 
  deleteUser,
  deleteCourse
} from "@/lib/actions";
import { cn } from "@/lib/utils";

type DeleteType = "corporation" | "facility" | "user" | "course";

interface Props {
  id: string;
  name: string;
  type: DeleteType;
  className?: string;
  variant?: "ghost" | "outline" | "destructive";
  size?: "sm" | "icon" | "default";
  title?: string;
}

export function DeleteButton({ id, name, type, className, variant = "ghost", size = "icon", title }: Props) {
  const handleDelete = async () => {
    let message = `「${name}」を削除しますか？`;
    if (type === "corporation") {
      message = `【警告】法人「${name}」を削除しますか？\n所属する全ての施設、ユーザー、受講記録が完全に削除されます。`;
    } else if (type === "facility") {
      message = `施設「${name}」を削除しますか？\n所属するスタッフと受講記録が削除されます。`;
    } else if (type === "course") {
      message = `研修コース「${name}」を完全に削除しますか？\n関連する学習スライド、テスト問題、受講記録もすべて削除されます。`;
    }

    if (!confirm(message)) return;

    try {
      if (type === "corporation") {
        await deleteCorporation(id);
      } else if (type === "facility") {
        await deleteFacility(id);
      } else if (type === "user") {
        await deleteUser(id);
      } else if (type === "course") {
        await deleteCourse(id);
      }
    } catch (error) {
      console.error(error);
      alert("削除中にエラーが発生しました。権限がないか、通信エラーの可能性があります。");
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDelete}
      title={title}
      className={cn(
        variant === "ghost" && "text-zinc-300 hover:text-red-600 hover:bg-red-50",
        className
      )}
    >
      <Trash2 className={cn(size === "icon" ? "w-4 h-4" : "w-4 h-4 mr-2")} />
      {size !== "icon" && "削除"}
    </Button>
  );
}