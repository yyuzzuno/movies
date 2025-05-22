"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Searcher } from "./Searcher";
// Create a client

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="mx-[32px]">
        <Searcher />
      </main>
    </QueryClientProvider>
  );
}
