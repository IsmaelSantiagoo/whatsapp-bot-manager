"use client";

import React, { JSX, useCallback, useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useHeader } from "@/context/header/context";

export const HeaderBreadcrumb = () => {
  const { pageTitle } = useHeader();
  const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[]>([]);

  const getBreadcrumbs = useCallback(() => {
    if (!pageTitle) {
      setBreadcrumbs([]);
      return;
    }

    const items = Array.isArray(pageTitle) ? pageTitle : [pageTitle];

    if (items.length === 0) {
      setBreadcrumbs([]);
      return;
    }

    const lastItem = items.pop();

    const breadcrumbs = items.map((item, index) => {
      if (typeof item === "string") {
        return <BreadcrumbLink key={index}>{item}</BreadcrumbLink>;
      }

      return (
        <BreadcrumbLink key={index} href={item.href}>
          {item.title}
        </BreadcrumbLink>
      );
    });

    breadcrumbs.push(
      <BreadcrumbPage key={breadcrumbs.length}>
        {typeof lastItem === "string" ? lastItem : lastItem?.title}
      </BreadcrumbPage>,
    );

    setBreadcrumbs(breadcrumbs);
  }, [pageTitle]);

  useEffect(() => {
    getBreadcrumbs();
  }, [getBreadcrumbs]);

  if (!pageTitle) return null;

  return (
    <>
      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-4"
      />

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index}>{item}</BreadcrumbItem>

              {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
