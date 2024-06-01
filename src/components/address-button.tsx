"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

// @ts-expect-error
export function AddressButton({ address, setAddress }) {

  const [localAddress, setLocalAddress] = useState(address);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          ADD BTC ADDRESS
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>
            Check BTC TXNs for Address.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={localAddress}
              className="col-span-3"
              onChange={(e) => setLocalAddress(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => {
              setAddress(localAddress)
            }}>Search</Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
