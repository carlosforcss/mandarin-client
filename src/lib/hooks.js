import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { hanziAPI, sentencesAPI, categoriesAPI, filesAPI } from './api'

// Hanzi hooks
export const useHanzis = (skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['hanzis', skip, limit],
    queryFn: () => hanziAPI.getAll(skip, limit),
    select: (response) => response.data,
  })
}

export const useHanzi = (id) => {
  return useQuery({
    queryKey: ['hanzi', id],
    queryFn: () => hanziAPI.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  })
}

export const useHanzisByHSK = (hsk_level, skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['hanzis', 'hsk', hsk_level, skip, limit],
    queryFn: () => hanziAPI.getByHSK(hsk_level, skip, limit),
    select: (response) => response.data,
    enabled: !!hsk_level,
  })
}

export const useHanzisByCategory = (category_id, hsk_level = null, skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['hanzis', 'category', category_id, hsk_level, skip, limit],
    queryFn: () => hanziAPI.getByCategory(category_id, hsk_level, skip, limit),
    select: (response) => response.data,
    enabled: !!category_id,
  })
}

export const useCreateHanzi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: hanziAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hanzis'] })
    },
  })
}

export const useUpdateHanzi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => hanziAPI.update(id, data),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['hanzi', id] })
      queryClient.invalidateQueries({ queryKey: ['hanzis'] })
    },
  })
}

export const useDeleteHanzi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: hanziAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hanzis'] })
    },
  })
}

// Sentences hooks
export const useSentences = (skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['sentences', skip, limit],
    queryFn: () => sentencesAPI.getAll(skip, limit),
    select: (response) => response.data,
  })
}

export const useSentence = (id) => {
  return useQuery({
    queryKey: ['sentence', id],
    queryFn: () => sentencesAPI.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  })
}

export const useSentencesByCategory = (category_id, skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['sentences', 'category', category_id, skip, limit],
    queryFn: () => sentencesAPI.getByCategory(category_id, skip, limit),
    select: (response) => response.data,
    enabled: !!category_id,
  })
}

export const useCreateSentence = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sentencesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentences'] })
    },
  })
}

export const useUpdateSentence = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => sentencesAPI.update(id, data),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['sentence', id] })
      queryClient.invalidateQueries({ queryKey: ['sentences'] })
    },
  })
}

export const useDeleteSentence = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sentencesAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentences'] })
    },
  })
}

// Categories hooks
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

export const useCategoriesByHSK = (hsk_level) => {
  return useQuery({
    queryKey: ['categories', 'hsk', hsk_level],
    queryFn: () => categoriesAPI.getByHSK(hsk_level),
    select: (response) => response.data,
    enabled: !!hsk_level,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: categoriesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => categoriesAPI.update(id, data),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['category', id] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: categoriesAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

// Files hooks
export const useUploadFile = () => {
  return useMutation({
    mutationFn: filesAPI.upload,
  })
}

export const useFile = (id) => {
  return useQuery({
    queryKey: ['file', id],
    queryFn: () => filesAPI.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  })
}

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: filesAPI.delete,
  })
}