import { useState } from "react";
import classNames from "classnames";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type { HTMLAttributes } from "react";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  type: "success" | "error" | "warning" | "info";
  dismissible?: boolean;
  onClick?: any;
};

export const Alert = ({
  children,
  type,
  className,
  dismissible = true,
  onClick
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={classNames(
        "rounded-md border-t-4 bg-white p-4 text-teal-900 shadow-md",
        {
          "border-green-400": type === "success",
          "border-red-400": type === "error",
          "border-yellow-400": type === "warning",
          "border-blue-400": type === "info",
        },
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === "success" && (
            <CheckCircleIcon
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          )}
          {type === "error" && (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
          {type === "warning" && (
            <ExclamationTriangleIcon
              className="h-6 w-6 text-yellow-400"
              aria-hidden="true"
            />
          )}
          {type === "info" && (
            <InformationCircleIcon
              className="h-6 w-6 text-blue-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p className={classNames("text-sm font-medium")}>{children}</p>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3" onClick={onClick}>
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={() => setIsVisible(false)}
                type="button"
                className={classNames(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  {
                    "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50":
                      type === "success",
                    "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50":
                      type === "error",
                    "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50":
                      type === "warning",
                    "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50":
                      type === "info",
                  }
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
