import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany();
  
  for (const course of courses) {
    let label = '';
    let icon = '';

    if (course.title.includes('虐待')) { label = '虐待防止'; icon = 'Shield'; }
    else if (course.title.includes('認知症')) { label = '認知症'; icon = 'Zap'; }
    else if (course.title.includes('感染症')) { label = '感染症'; icon = 'HeartPulse'; }
    else if (course.title.includes('事故')) { label = '事故防止'; icon = 'AlertCircle'; }
    else if (course.title.includes('緊急')) { label = '緊急対応'; icon = 'Clock'; }
    else if (course.title.includes('プライバシー')) { label = '個人情報'; icon = 'BookOpen'; }
    else if (course.title.includes('倫理')) { label = '倫理遵守'; icon = 'Scale'; }
    else if (course.title.includes('接遇')) { label = '接遇マナー'; icon = 'Sparkles'; }
    else if (course.title.includes('災害')) { label = '災害対策'; icon = 'Flame'; }
    else if (course.title.includes('介護予防')) { label = '介護予防'; icon = 'Trophy'; }
    else if (course.title.includes('医療')) { label = '医療連携'; icon = 'HeartPulse'; }
    else if (course.title.includes('看取り')) { label = '看取り'; icon = 'HeartPulse'; }
    else if (course.title.includes('精神的')) { label = '精神ケア'; icon = 'Sparkles'; }

    if (label && icon) {
      await prisma.course.update({
        where: { id: course.id },
        data: { badgeLabel: label, badgeIcon: icon }
      });
      console.log(`Updated: ${course.title} -> ${label}`);
    }
  }
  console.log('Update complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect())
