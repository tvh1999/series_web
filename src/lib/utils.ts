import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeSince(dateString: string | Date): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
}

interface FormUrlPathProps {
  entireSearchParams: string;
  key: string;
  value: string | null;
}

export const formUrlPath = function ({
  entireSearchParams,
  key,
  value,
}: FormUrlPathProps) {
  const currentUrl = qs.parse(entireSearchParams);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

interface DeleteUrlPathProps {
  entireSearchParams: string;
  keysToRemove: string[];
}

export const deleteUrlPath = function ({
  entireSearchParams,
  keysToRemove,
}: DeleteUrlPathProps) {
  const currentUrl = qs.parse(entireSearchParams);

  keysToRemove.forEach((key) => delete currentUrl[key]);

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

export const reuploadingData = function () {};
