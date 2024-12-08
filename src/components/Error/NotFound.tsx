'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound({
  message = "PAGE_NOT_FOUND"
}: {
  message?: ErrorType | string,
}) {
  const router = useRouter()
  // const login: () => Promise<void> = async () => {
  //   await logoutApi()
  //   signOut()
  //   router.replace('/auth/login')
  // }

  return <div className='max-w-[520px] h-dvh
      w-full mx-auto text-center flex flex-col gap-4'>
    <div className='px-5'>
      {displayErrorMessage({ ErrorType: message, Action: () => router.push('/auth/login') })}
    </div>
    <Link href='/'
      className='text-blue-500 hover:underline'>
      Go back to Home
    </Link>
  </div>
}

function displayErrorMessage({ ErrorType, Action }: { ErrorType: ErrorType | string, Action: () => void }) {
  let title, description;


  switch (ErrorType.toUpperCase()) {
    case "GENERAL_SERVER_ERROR":
      title = "Oops! Something went wrong.";
      description = "Our server encountered an unexpected issue. Please try again later. If the problem persists, contact our support team.";
      break;
    case "NETWORK_ERROR":
      title = "Network Error";
      description = "It seems there is a problem with your network connection. Please check your internet connection and try again.";
      break;
    case "AUTHENTICATION_ERROR":
      title = "Authentication Failed";
      description = "We couldn't verify your credentials. Please check your username and password and try again.";
      break;
    case "PAGE_NOT_FOUND":
      title = "Sorry, this page isn't available.";
      description = "The page you're looking for doesn't exist. It might have been removed, renamed, or didn't exist in the first place.";
      break;
    case "UNAUTHORIZED_ACCESS":
      title = "Access Denied";
      description = "You do not have permission to access this resource. Please contact support if you believe this is a mistake.";
      break;
    case "BAD_USER_INPUT":
      title = "Invalid Client Credentials";
      description = "The data you provided is invalid. Please check your input and try again.";
    case "UNAUTHENTICATED":
      title = "Unauthenticated Access";
      description = "You need to be logged in to access this feature. Please log in or sign up to continue";
      break;
    case "SERVICE_UNAVAILABLE":
      title = "Service Unavailable";
      description = "Our servers are currently undergoing maintenance. Please check back later.";
      break;
    case "RATE_LIMIT_EXCEEDED":
      title = "Rate Limit Exceeded";
      description = "You've made too many requests in a short period. Please slow down and try again later.";
      break;
    case "INTERNAL_SERVER_ERROR":
      title = "Internal Server Error";
      description = "An unexpected error occurred on our server. Our team has been notified and is working to resolve the issue.";
      break;
    case "DATA_FETCH_ERROR":
      title = "Data Fetch Error";
      description = "We encountered an error while trying to retrieve data. Please refresh the page or try again later.";
      break;
    case "TIMEOUT_ERROR":
      title = "Request Timeout";
      description = "Your request took too long to process. Please try again later.";
      break;
    default:
      title = "Internal Server Error";
      description = "An unexpected error occurred on our server. Our team has been notified and is working to resolve the issue.";
  }

  return (
    <>
      <h2 className='text-2xl font-semibold my-8'>{title}</h2>
      <p className='my-4'>{description}</p>
      {ErrorType === "UNAUTHENTICATED" && <Button onClick={Action} className='rounded-xl'>Login</Button>}
    </>
  );
}

export type ErrorType =
  | "GENERAL_SERVER_ERROR"
  | "NETWORK_ERROR"
  | "AUTHENTICATION_ERROR"
  | "PAGE_NOT_FOUND"
  | "UNAUTHORIZED_ACCESS"
  | "SERVICE_UNAVAILABLE"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_SERVER_ERROR"
  | "DATA_FETCH_ERROR"
  | "UNAUTHENTICATED"
  | "TIMEOUT_ERROR";