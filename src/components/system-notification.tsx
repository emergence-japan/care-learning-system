import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { AlertCircle, Info, AlertTriangle, Bell } from "lucide-react";
import { Role } from "@prisma/client";

export async function SystemNotification() {
  const session = await auth();
  if (!session?.user) return null;

  const userRole = session.user.role as Role;
  const now = new Date();
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
            // 1. 全体宛（ロール指定なし、組織指定なし）
            { targetRole: null, targetCorporationId: null, targetFacilityId: null },
            // 2. ロールのみ指定（全組織のそのロール宛）
            { targetRole: userRole, targetCorporationId: null, targetFacilityId: null },
            // 3. 法人指定
            { 
              targetCorporationId: session.user.corporationId, 
              targetFacilityId: null,
              OR: [{ targetRole: null }, { targetRole: userRole }] 
            },
            // 4. 施設指定
            { 
              targetFacilityId: session.user.facilityId,
              OR: [{ targetRole: null }, { targetRole: userRole }]
            }
          ]
        }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  if (notifications.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8 space-y-3 no-print animate-in fade-in slide-in-from-top-4 duration-700">
      {notifications.map((n) => (
        <div 
          key={n.id} 
          className={`relative overflow-hidden rounded-2xl border p-4 flex items-start gap-4 transition-all shadow-sm ${
            n.severity === 'CRITICAL' ? 'bg-red-50 border-red-200 text-red-900 shadow-red-100/50' :
            n.severity === 'WARNING' ? 'bg-amber-50 border-amber-200 text-amber-900' :
            'bg-blue-50 border-blue-200 text-blue-900'
          }`}
        >
          {/* Severity Icon */}
          <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
            n.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' :
            n.severity === 'WARNING' ? 'bg-amber-100 text-amber-600' :
            'bg-blue-100 text-blue-600'
          }`}>
            {n.severity === 'CRITICAL' ? <AlertCircle className="w-5 h-5" /> :
             n.severity === 'WARNING' ? <AlertTriangle className="w-5 h-5" /> :
             <Info className="w-5 h-5" />}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between gap-4">
              <h4 className="font-bold text-sm flex items-center gap-2">
                {n.title}
                {n.severity === 'CRITICAL' && (
                  <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest animate-pulse">
                    Important
                  </span>
                )}
              </h4>
              <span className="text-[10px] font-bold opacity-50 tabular-nums">
                {n.createdAt.toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed opacity-80">
              {n.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
