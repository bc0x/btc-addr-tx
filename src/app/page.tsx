"use client";
import Link from "next/link"
import {
  CircleUser,
  Home,
  Menu,
  Package2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { TransactionTable } from "@/components/tx_table"
import { SignOutButton } from "@/components/sign-out"
import { AddressButton } from "@/components/address-button"
import { useState } from "react"
import { get } from "http";


export default function Page() {
  const [address, setAddress] = useState("ENTER ADDR")
  const [balance, setBalance] = useState(0)
  const [price, setPrice] = useState(0)

  function getPrice(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Address Check</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <AddressButton address={address} setAddress={setAddress} />
            </nav>
          </div>
          <div className="mt-auto p-4">

          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <div
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                </div>

                <div
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <AddressButton address={address} setAddress={setAddress} />
                </div>

                <div
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <SheetClose asChild>
                    <Button type="submit">CLOSE</Button>
                  </SheetClose>
                </div>

              </nav>
              <div className="mt-auto">

              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Transactions For: {address} - BTC Price {getPrice(price)}</h1>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold md:text-2xl">Wallet Balance: {balance * 10e-9} BTC - {getPrice(balance * 10e-9 * price)} usd</h2>
          </div>
          <div
            className="flex flex-1">
            <TransactionTable address={address} setBalance={setBalance} setPrice={setPrice} />
          </div>
        </main>
      </div>
    </div>
  )
}
