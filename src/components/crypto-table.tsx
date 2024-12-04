import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

interface CryptoTableProps {
  index: string;
  ethValue: string;
  ethBehavior: "up" | "down";
}

export function CryptoTable({
  index,
  ethValue,
  ethBehavior,
}: CryptoTableProps) {
  const [usdc, setUsdc] = useState("");
  const [eth, setEth] = useState("");
  const [ethAaveValue, setEthAaveValue] = useState("");
  const [ethDifference, setEthDifference] = useState("");
  const [usdcIncrease, setUsdcIncrease] = useState("");
  const [winnings, setWinnings] = useState("");
  const [safeValue, setSafeValue] = useState("");
  const [idealValue, setIdealValue] = useState("");

  useEffect(() => {
    if (usdc && eth && eth !== "." && eth !== "0" && eth !== "0.") {
      const value = parseFloat(usdc) / parseFloat(eth);
      setEthAaveValue(value.toFixed(2));
    } else {
      setEthAaveValue("");
    }
  }, [usdc, eth]);

  useEffect(() => {
    if (ethAaveValue && ethValue) {
      const value = parseFloat(ethValue) - parseFloat(ethAaveValue);
      setEthDifference(value.toFixed(2));
    } else {
      setEthDifference("");
    }
  }, [ethAaveValue, ethValue]);

  useEffect(() => {
    if (eth && ethValue) {
      const value = parseFloat(eth) * parseFloat(ethValue);
      setUsdcIncrease(value.toFixed(2));
    } else {
      setEthDifference("");
    }
  }, [eth, ethValue]);

  useEffect(() => {
    if (usdc && usdcIncrease) {
      const value =
        ethBehavior === "up"
          ? parseFloat(usdcIncrease) - parseFloat(usdc)
          : parseFloat(usdc) - parseFloat(usdcIncrease);
      setWinnings(value.toFixed(2));
    } else {
      setWinnings("");
    }
  }, [ethBehavior, usdc, usdcIncrease]);

  useEffect(() => {
    if (ethAaveValue) {
      const value =
        ethBehavior === "up"
          ? parseFloat(ethAaveValue) * 0.004334 + parseFloat(ethAaveValue)
          : parseFloat(ethAaveValue) * 0.004334 - parseFloat(ethAaveValue);
      setSafeValue(value.toFixed(2));
    } else {
      setSafeValue("");
    }
  }, [ethAaveValue, ethBehavior]);

  useEffect(() => {
    if (ethAaveValue) {
      const value =
        ethBehavior === "up"
          ? parseFloat(ethAaveValue) * 0.0065 + parseFloat(ethAaveValue)
          : parseFloat(ethAaveValue) * 0.0065 - parseFloat(ethAaveValue);
      setIdealValue(value.toFixed(2));
    } else {
      setIdealValue("");
    }
  }, [ethAaveValue, ethBehavior]);

  const validateInput = (value: string) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    return regex.test(value);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">USDC</TableHead>
          <TableHead>ETH</TableHead>
          <TableHead>Valor ETH</TableHead>
          <TableHead>Resultado</TableHead>
          <TableHead>0.4334%</TableHead>
          <TableHead>0.65%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Input
              id={`usdc-${index}`}
              name={`usdc-${index}`}
              className="min-w-24"
              type="text"
              value={usdc}
              onChange={(e) => {
                if (validateInput(e.target.value)) {
                  setUsdc(e.target.value);
                }
              }}
              placeholder="$0.00"
            />
          </TableCell>
          <TableCell>
            <Input
              id={`eth-${index}`}
              name={`eth-${index}`}
              className="min-w-24"
              type="text"
              value={eth}
              onChange={(e) => {
                if (validateInput(e.target.value)) {
                  setEth(e.target.value);
                }
              }}
              placeholder="0.00"
            />
          </TableCell>
          <TableCell className="min-w-28">
            {ethAaveValue && `$${ethAaveValue}`}
          </TableCell>
          <TableCell className="min-w-24">{usdc && `$${usdc}`}</TableCell>
          <TableCell className={safeValue ? "bg-[#83E291] min-w-24" : ""}>
            {safeValue && `$${safeValue}`}
          </TableCell>
          <TableCell className={idealValue ? "bg-[#F1CEEE] min-w-24" : ""}>
            {idealValue && `$${idealValue}`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell>{ethValue && `$${ethValue}`}</TableCell>
          <TableCell>{usdcIncrease ? `$${usdcIncrease}` : ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell>{ethDifference ? `$${ethDifference}` : ""}</TableCell>
          <TableCell>{winnings ? `$${winnings}` : ""}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
