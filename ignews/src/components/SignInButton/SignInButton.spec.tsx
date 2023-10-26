import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton component', () => {
  //it --> referencia o texto do describe
  it('renders correctly when user is not authenticated', () => {
    const useSessionMoked = jest.mocked(useSession)

    useSessionMoked.mockResolvedValueOnce({
      data: {
        expires: "fake-expires",
      },
      status: "unauthenticated",
    } as any)
    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMoked = jest.mocked(useSession)
    useSessionMoked.mockResolvedValueOnce({
      data: {
        session: {
          user: { name: "John Doe", email: "john.doe@example.com" },
        },
        expires: "fake-expires",
      },
      status: 'authenticated'
    } as any)
    render(
      <SignInButton />
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})