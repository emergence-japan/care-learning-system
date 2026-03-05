/**
 * カスタムエラークラス
 * サーバーアクション内で使用し、エラーの種類を明確にする
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "認証が必要です。") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "この操作を実行する権限がありません。") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "リソースが見つかりませんでした。") {
    super(message);
    this.name = "NotFoundError";
  }
}
