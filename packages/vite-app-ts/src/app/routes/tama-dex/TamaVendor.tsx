import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { Col, Divider, Input, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { TTransactor } from "eth-components/functions";
import { TamaDEX, TamaToken } from "~~/generated/contract-types";
import { BigNumber, ethers } from "ethers";
import { useBlockNumber } from "eth-hooks";
import { useEthersContext } from "eth-hooks/context";

export interface ITamaVendor {
    mainnetProvider: StaticJsonRpcProvider;
    yourCurrentBalance: any;
    address: string | undefined;
    price: number;
    tx?: TTransactor;
    tamaTokenRead: TamaToken;
    tamaTokenWrite: TamaToken;
    tamaDexWrite: TamaDEX;
    tamaDexRead: TamaDEX;
}

interface anyValue {
    [key: string]: string;
}

export const TamaVendor: FC<ITamaVendor> = (props) => {
    const [values, setValues] = useState<anyValue>({});
    const [currentTokenBalance, setCurrentTokenBalance] = useState<BigNumber>();
    const ethersContext = useEthersContext();
    const [ethToTokenPrice, setEthToTokenPrice] = useState<BigNumber>();
    const [tokenToEthPrice, setTokenToEthPrice] = useState<BigNumber>();

    useEffect(() => {
        const updatePrices = async () => {
            let valueInEther = ethers.utils.parseEther("1");
            let ethToToken = await props.tamaDexRead?.ethToTokenPrice(valueInEther);
            let tokenToEth = await props.tamaDexRead?.tokenToEthPrice(valueInEther);
            setEthToTokenPrice(ethToToken);
            setTokenToEthPrice(tokenToEth);
        };
        updatePrices();
    }, [ethersContext.ethersProvider?.blockNumber, props.tamaDexRead]);

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
        let swapEthToTokenResult = await props.tx(props.tamaDexWrite.ethToToken({ value: valueInEther }));

        console.log("swapEthToTokenResult:", swapEthToTokenResult);
        let newBalance = await props.tamaTokenRead.balanceOf(props.address);
        let newBalanceBigNumber = BigNumber.from(newBalance);
        setCurrentTokenBalance(newBalanceBigNumber);
    }

    async function TokenToEth(value: string): Promise<any> {
        if (!props.tx || !props.address) return;
        let valueInEther = ethers.utils.parseEther("" + value);
        console.log("valueInEther", valueInEther);

        let allowance = await props.tamaTokenRead.allowance(
            props.address,
            props.tamaDexWrite.address,
        );
        console.log("allowance", allowance);

        let approveTx;
        if (allowance < valueInEther) {
            approveTx = props.tx(
                props.tamaTokenWrite.approve(props.tamaDexWrite.address, valueInEther, { gasLimit: 200000 }),
            );
        }

        if (approveTx) {
            console.log("waiting on approve to finish...");
            let approveTxResult = await approveTx;
            console.log("approveTxResult:", approveTxResult);
        }

        let swapTx = props.tx(props.tamaDexWrite.tokenToEth(valueInEther, { gasLimit: 200000 }));
        let swapTxResult = await swapTx;
        console.log("swapTxResult:", swapTxResult);
        let newBalance = await props.tamaTokenRead.balanceOf(props.address);
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
                    {ethers.utils.formatEther(currentTokenBalance?._isBigNumber ? currentTokenBalance : 0)}
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={8} style={{ textAlign: "right", opacity: 0.333, paddingRight: 6, fontSize: 24 }}>
                    1 ETH buys:
                </Col>
                <Col span={16}>
                    {ethers.utils.formatEther(ethToTokenPrice?._isBigNumber ? ethToTokenPrice : 0)} TAMA
                </Col>
            </Row>
            {rowForm("ethToToken", "💸", EthToToken)}
            <Divider />
            <Row>
                <Col span={8} style={{ textAlign: "right", opacity: 0.333, paddingRight: 6, fontSize: 24 }}>
                    1 TAMA buys:
                </Col>
                <Col span={16}>
                    {ethers.utils.formatEther(tokenToEthPrice?._isBigNumber ? tokenToEthPrice : 0)} ETH
                </Col>
            </Row>
            {rowForm("tokenToEth", "🔏", TokenToEth)}
        </div>)
}
