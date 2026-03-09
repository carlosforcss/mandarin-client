import { useQuery, useMutation } from '@tanstack/react-query'
import { hanziAPI, categoriesAPI } from './api'

export const useHanzisByCategory = (category_id, hsk_level = null, skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['hanzis', 'category', category_id, hsk_level, skip, limit],
    queryFn: () => hanziAPI.getByCategory(category_id, hsk_level, skip, limit),
    select: (response) => response.data,
    enabled: !!category_id,
  })
}

export const useHanziSpeech = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await hanziAPI.getSpeech(id)
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audio.play()
      return audioUrl
    },
  })
}

export const useCategories = (skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['categories', skip, limit],
    queryFn: () => categoriesAPI.getAll(skip, limit),
    select: (response) => response.data,
  })
}

export const useCategory = (id) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesAPI.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  })
}
