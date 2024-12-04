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

export function CryptoTable() {
  const [usdc, setUsdc] = useState("");
  const [eth, setEth] = useState("");
  const [ethAaveValue, setEthAaveValue] = useState("");
  const [ethValue, setEthValue] = useState("");
  const [ethDifference, setEthDifference] = useState("");
  const [usdcValue, setUsdcValue] = useState("");
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
    if (ethAaveValue && eth && eth !== "." && eth !== "0" && eth !== "0.") {
      const value = parseFloat(eth) * parseFloat(ethAaveValue);
      setUsdcValue(value.toFixed(2));
    } else {
      setUsdcValue("");
    }
  }, [eth, ethAaveValue]);

  useEffect(() => {
    if (eth && ethValue) {
      const value = parseFloat(eth) * parseFloat(ethValue);
      setUsdcIncrease(value.toFixed(2));
    } else {
      setEthDifference("");
    }
  }, [eth, ethValue]);

  useEffect(() => {
    if (usdcValue && usdcIncrease) {
      const value = parseFloat(usdcIncrease) - parseFloat(usdcValue);
      setWinnings(value.toFixed(2));
    } else {
      setWinnings("");
    }
  }, [usdcValue, usdcIncrease]);

  useEffect(() => {
    if (ethAaveValue) {
      const value =
        parseFloat(ethAaveValue) * 0.004334 + parseFloat(ethAaveValue);
      setSafeValue(value.toFixed(2));
    } else {
      setSafeValue("");
    }
  }, [ethAaveValue]);

  useEffect(() => {
    if (ethAaveValue) {
      const value =
        parseFloat(ethAaveValue) * 0.0065 + parseFloat(ethAaveValue);
      console.log("value:", value);
      setIdealValue(value.toFixed(2));
    } else {
      setIdealValue("");
    }
  }, [ethAaveValue]);

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
          <TableCell>{ethAaveValue && `$${ethAaveValue}`}</TableCell>
          <TableCell>{usdcValue && `$${usdcValue}`}</TableCell>
          <TableCell className={safeValue ? "bg-[#83E291]" : ""}>
            {safeValue && `$${safeValue}`}
          </TableCell>
          <TableCell className={idealValue ? "bg-[#F1CEEE]" : ""}>
            {idealValue && `$${idealValue}`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell>
            <Input
              type="text"
              value={ethValue}
              onChange={(e) => {
                if (validateInput(e.target.value)) {
                  setEthValue(e.target.value);
                }
              }}
              placeholder="$0.00"
            />
          </TableCell>
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
