import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createCorporation, updateCorporation, createFacility, registerStaff } from '@/lib/actions'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

vi.mock('@/auth', () => ({
  auth: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock('@/lib/prisma', () => ({
  default: {
    corporation: {
      create: vi.fn(),
      update: vi.fn(),
      findUnique: vi.fn(),
    },
    facility: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    course: {
      findMany: vi.fn(),
    },
    enrollment: {
      createMany: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Corporation Limits Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(auth as any).mockResolvedValue({ user: { role: 'SUPER_ADMIN' } })
  })

  it('法人作成時に制限値を保存できること', async () => {
    const formData = new FormData()
    formData.append('name', 'Test Corp')
    formData.append('maxFacilities', '20')
    formData.append('maxStaff', '200')

    await createCorporation(formData)

    expect(prisma.corporation.create).toHaveBeenCalledWith({
      data: {
        name: 'Test Corp',
        maxFacilities: 20,
        maxStaff: 200,
      }
    })
  })

  it('法人の制限値を更新できること', async () => {
    const formData = new FormData()
    formData.append('name', 'Updated Corp')
    formData.append('maxFacilities', '30')
    formData.append('maxStaff', '300')

    await updateCorporation('corp-id', formData)

    expect(prisma.corporation.update).toHaveBeenCalledWith({
      where: { id: 'corp-id' },
      data: {
        name: 'Updated Corp',
        maxFacilities: 30,
        maxStaff: 300,
      }
    })
  })

  it('施設数が上限に達している場合、エラーを投げること', async () => {
    ;(prisma.corporation.findUnique as any).mockResolvedValue({
      id: 'corp-1',
      maxFacilities: 2,
      _count: { facilities: 2 }
    })

    const formData = new FormData()
    formData.append('name', 'New Facility')
    formData.append('corporationId', 'corp-1')

    await expect(createFacility(formData)).rejects.toThrow(/施設登録枠の上限/i)
  })

  it('スタッフ数が上限に達している場合、エラーメッセージを返すこと', async () => {
    ;(auth as any).mockResolvedValue({ user: { role: 'ADMIN', facilityId: 'fac-1' } })
    ;(prisma.facility.findUnique as any).mockResolvedValue({
      id: 'fac-1',
      corporation: {
        id: 'corp-1',
        maxStaff: 5,
        _count: { users: 5 }
      }
    })

    const formData = new FormData()
    formData.append('name', 'New Staff')
    formData.append('email', 'new@example.com')
    formData.append('password', 'password')

    const result = await registerStaff(formData)
    expect(result).toMatch(/スタッフ登録枠の上限/i)
  })
})