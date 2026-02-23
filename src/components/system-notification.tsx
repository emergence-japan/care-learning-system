import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Role } from "@prisma/client";

export async function SystemNotification() {
  const session = await auth();
  
  // セッションがない、またはIDが1つもない場合は何も表示しない（クラッシュ防止）
  if (!session?.user || (!session.user.corporationId && !session.user.facilityId && session.user.role !== 'SUPER_ADMIN')) {
    return null;
  }

  const userRole = session.user.role as Role;
  const corpId = session.user.corporationId || "NEVER_MATCH_ID";
  const facId = session.user.facilityId || "NEVER_MATCH_ID";
  const now = new Date();

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        isPublished: true,
        AND: [
          {
            OR: [
              { expiresAt: null },
              { expiresAt: { gt: now } }
            ]
          },
          {
            OR: [
              // 1. 全体宛
              { targetRole: null, targetCorporationId: null, targetFacilityId: null },
              // 2. ロールのみ指定
              { targetRole: userRole, targetCorporationId: null, targetFacilityId: null },
              // 3. 法人指定
              { 
                targetCorporationId: corpId, 
                targetFacilityId: null,
                OR: [{ targetRole: null }, { targetRole: userRole }] 
              },
              // 4. 施設指定
              { 
                targetFacilityId: facId,
                OR: [{ targetRole: null }, { targetRole: userRole }]
              }
            ]
          }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 3
    }) || [];

    if (notifications.length === 0) return null;

    return (
      <div className="max-w-6xl mx-auto mb-8 space-y-3 no-print">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`rounded-2xl border p-4 flex items-start gap-4 transition-all shadow-sm ${
              n.severity === 'CRITICAL' ? 'bg-red-50 border-red-200 text-red-900' :
              n.severity === 'WARNING' ? 'bg-amber-50 border-amber-200 text-amber-900' :
              'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {n.severity === 'CRITICAL' ? <AlertCircle className="w-5 h-5 text-red-600" /> :
               n.severity === 'WARNING' ? <AlertTriangle className="w-5 h-5 text-amber-600" /> :
               <Info className="w-5 h-5 text-blue-600" />}
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-sm">{n.title}</h4>
              <p className="text-xs opacity-80">{n.content}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Notification Error:", error);
    return null; // エラーが起きても画面全体を落とさない
  }
}
