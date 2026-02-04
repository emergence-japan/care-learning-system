import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createCorporation, updateCorporation } from '@/lib/actions'
import prisma from '@/lib/prisma'

vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ user: { role: 'SUPER_ADMIN' } }),
}))

vi.mock('@/lib/prisma', () => ({
  default: {
    corporation: {
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Corporation Limits Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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
})
