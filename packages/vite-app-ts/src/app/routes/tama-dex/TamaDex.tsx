import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { Col, Input, Row } from "antd";
import { FC, useState } from "react";
import { TTransactor } from "eth-components/functions";
import { TamaDEX, TamaToken } from "~~/generated/contract-types";
import { BigNumber, ethers } from "ethers";

export interface ITamaDex {
    mainnetProvider: StaticJsonRpcProvider;
    yourCurrentBalance: any;
    address: string | undefined;
    price: number;
    tx?: TTransactor;
    readContracts: Record<string, ethers.BaseContract>;
    writeContracts: Record<string, ethers.BaseContract>;
}

interface anyValue {
    [key: string]: string;
}

export const TamaDex: FC<ITamaDex> = (props) => {
    const [values, setValues] = useState<anyValue>({});
    const [currentTokenBalance, setCurrentTokenBalance] = useState<BigNumber>();

    const TamaTokenRead = props.readContracts['TamaToken'] as TamaToken;
    const TamaTokenWrite = props.writeContracts['TamaToken'] as TamaToken;
    const TamaDexWrite = props.writeContracts['TamaDEX'] as TamaDEX;


    const rowForm = (title: string, icon: string, onClick: (value: string) => any) => {
        return (
            <Row>
                <Col span={8} style={{ textAlign: "right", opacity: 0.333, paddingRight: 6, fontSize: 24 }}>
                    {title}
                </Col>
                <Col span={16}>
                    <div style={{ cursor: "pointer", margin: 2 }}>
                        <Input
                            onChange={e => {
                                let newValues: any = { ...values };
                                newValues[title] = e.target.value;
                                setValues(newValues);
                            }}
                            value={values[title]}
                            addonAfter={
                                <div
                                    // type="default"
                                    onClick={async () => {
                                        await onClick(values[title]);
                                        let newValues = { ...values };
                                        newValues[title] = "";
                                        setValues(newValues);
                                    }}
                                >
                                    {icon}
                                </div>
                            }
                        />
                    </div>
                </Col>
            </Row>
        );
    };

    async function EthToToken(value: string): Promise<any> {
        if (!props.tx || !props.address) return;

        let valueInEther = ethers.utils.parseEther("" + value);
        let swapEthToTokenResult = await props.tx(TamaDexWrite.ethToToken({ value: valueInEther }));

        console.log("swapEthToTokenResult:", swapEthToTokenResult);
        let newBalance = await TamaTokenRead.balanceOf(props.address);
        let newBalanceBigNumber = BigNumber.from(newBalance);
        setCurrentTokenBalance(newBalanceBigNumber);
    }

    async function TokenToEth(value: string): Promise<any> {
        if (!props.tx || !props.address) return;
        let valueInEther = ethers.utils.parseEther("" + value);
        console.log("valueInEther", valueInEther);

        let allowance = await TamaTokenRead.allowance(
            props.address,
            TamaDexWrite.address,
        );
        console.log("allowance", allowance);

        let approveTx;
        if (allowance < valueInEther) {
            approveTx = props.tx(
                TamaTokenWrite.approve(props.address, valueInEther, {
                    gasLimit: 200000,
                }),
            );
        }

        let swapTx = props.tx(TamaDexWrite.tokenToEth(valueInEther, { gasLimit: 200000 }));
        if (approveTx) {
            console.log("waiting on approve to finish...");
            let approveTxResult = await approveTx;
            console.log("approveTxResult:", approveTxResult);
        }
        let swapTxResult = await swapTx;
        console.log("swapTxResult:", swapTxResult);
        let newBalance = await TamaTokenRead.balanceOf(props.address);
        let newBalanceBigNumber = BigNumber.from(newBalance);
        setCurrentTokenBalance(newBalanceBigNumber);
    }

    return (
        <div>
            <Row>
                <Col span={8} style={{ textAlign: "right", opacity: 0.333, paddingRight: 6, fontSize: 24 }}>
                    TAMA Balance:
                </Col>
                <Col span={16}>
                    {currentTokenBalance?.toString()}
                </Col>
            </Row>
            {rowForm("ethToToken", "💸", EthToToken)}
            {rowForm("tokenToEth", "🔏", TokenToEth)}
        </div>)
}
