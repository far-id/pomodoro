import { Dashboard } from '@/features/app/pages/Dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})
