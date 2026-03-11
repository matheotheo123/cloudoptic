export interface Lead {
  id?: string
  name: string
  email: string
  company: string
  cloud_spend: string
  message?: string
  created_at?: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  cloud_spend: string
  message: string
  turnstileToken: string
}

export interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}
