
import mempoolJS from "@mempool/mempool.js";
import { Tx } from "@mempool/mempool.js/lib/interfaces/bitcoin/transactions";

export type Transaction = {
  tx_id: string
  type: "send" | "recieve"
  date: number
  amount: number
  status: "pending" | "completed"
}

function getAmounts(t: Tx, address: string) {
  const inputs = t.vin.reduce<number>((acc: number, t) => {
    if(t.is_coinbase){
      return acc
    }

    if (t.prevout.scriptpubkey_address === address) {
      
      return acc += t.prevout.value
    }
    
    return acc
  }, 0)

  const outputs = t.vout.reduce<number>((acc: number, t) => {
    if (t.scriptpubkey_address !== address) {
      return acc += t.value
    }
    return acc
  }, 0)

  const change = t.vout.reduce<number>((acc: number, t) => {
    if (t.scriptpubkey_address === address) {
      return acc += t.value
    }
    return acc
  }, 0)

  const fee = t.fee
  return { inputs, outputs, change, fee };
}

export async function GET(request: Request) {
  const { bitcoin: { addresses } } = mempoolJS({
    hostname: 'mempool.space'
  });
  const url = new URL(request.url)
  const query = new URLSearchParams(url.searchParams)
  const address = query.get("address")

  const response = await fetch("https://mempool.space/api/v1/prices")
  const prices = await response.json()

  const myAddress = await addresses.getAddress({ address: address! });
  const addressTxs = await addresses.getAddressTxs({ address: address! });
  const transactions = addressTxs.map((t): Transaction => {
    const { inputs, outputs, change, fee } = getAmounts(t, address!)
    return {
      tx_id: t.txid,
      type: change - inputs > 0 ? "recieve" : "send",
      date: t.status.block_height ?? "N/A",
      amount: change - inputs,
      status: t.status.confirmed ? "completed" : "pending"
    }
  })
  return Response.json({ data: transactions, price: prices, balance: myAddress.chain_stats.funded_txo_sum - myAddress.chain_stats.spent_txo_sum })
}