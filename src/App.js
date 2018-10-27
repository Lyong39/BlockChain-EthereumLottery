import React, {Component} from 'react';
import {Message, Container, Card, Image, Icon, Statistic, Button, Label} from 'semantic-ui-react';
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {

    state = {
        manager: "",
        playersCount: 0,
        blance: 0,
        loading: false,
        pickWinnerLoading: false,
        refundLoading: false,
        managerDisable: false,
        showButton: 'none'
    };


    async componentDidMount() {
        const address = await lottery.methods.getManager().call();
        const players = await lottery.methods.getAllPlayers().call();
        const playersCount = players.length;
        const balanceWEI = await lottery.methods.getBalance().call();
        const balanceETH = web3.utils.fromWei(balanceWEI);
        this.setState({
            manager: address,
            playersCount: playersCount,
            blance: balanceETH
        });
        const accounts = await web3.eth.getAccounts();
        if (accounts[0] === address) {
            this.setState({showButton: 'inline'});
        } else {
            this.setState({showButton: 'none'});
        }
    };

    enter = async () => {
        this.setState({loading: true});
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.enter().send({
            from: accounts[0],
            value: 1000000000000000000
        });
        this.setState({loading: false});
        window.location.reload(true);
    };

    pickWinner = async () => {
        this.setState({
            pickWinnerLoading: true,
            managerDisable: true
        });
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });
        this.setState({
            pickWinnerLoading: false,
            managerDisable: false
        });
        window.location.reload(true);
    };

    refund = async () => {
        this.setState({
            refundLoading: true,
            managerDisable: true
        });
        const accouts = await web3.eth.getAccounts();
        await lottery.methods.refund().send({
            from: accouts[0]
        });
        this.setState({
            refundLoading: false,
            managerDisable: false
        });
        window.location.reload(true);
    };

    render() {
        console.log(web3.version);
        return (
            <Container>
                <style>{`
                        #root > div {
                            width: 75%
                        }
                        `}</style>
                <br/>
                <Message color='yellow' info>
                    <Message.Header>区块链彩票网站</Message.Header>
                    <p>币价又要跌了, 赶紧换成彩票, 智能合约放心你 我 他</p>
                </Message>
                <Card.Group>
                    <Card>
                        <Image src='/images/btc.jpg'/>
                        <Card.Content>
                            <Card.Header>BTC彩票</Card.Header>
                            <Card.Meta>
                                <p>管理员地址:</p>
                                <Label size="mini">
                                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                </Label>
                            </Card.Meta>
                            <Card.Description>每周三晚上8点准时开奖</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                目前参与人数: 100 人
                            </a>
                        </Card.Content>
                        <Card.Content>
                            <Card.Meta>
                                <span>奖池累计奖金</span>
                            </Card.Meta>
                            <Statistic color='teal'>
                                <Statistic.Value>100 BTC</Statistic.Value>
                            </Statistic>
                        </Card.Content>
                        <Button animated='fade'>
                            <Button.Content visible>投 注</Button.Content>
                            <Button.Content hidden>1个BTC</Button.Content>
                        </Button>
                        <Card.Content extra style={{display: 'none'}}>
                            <div className='ui two buttons'>
                                <Button basic color='green'>开奖</Button>
                                <Button basic color='red'>退款</Button>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <style>{`
                            #root > div > div.ui.cards > div.ui.card {
                                width: 325px
                            }
                        `}</style>
                        <Image src='/images/eth.jpg'/>
                        <Card.Content>
                            <Card.Header>ETH彩票</Card.Header>
                            <Card.Meta>
                                <p>管理员地址:</p>
                                <Label size="mini">
                                    {this.state.manager}
                                </Label>
                            </Card.Meta>
                            <Card.Description>每周三晚上8点准时开奖</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                目前参与人数: {this.state.playersCount} 人
                            </a>
                        </Card.Content>
                        <Card.Content>
                            <Card.Meta>
                                <span>奖池累计奖金</span>
                            </Card.Meta>
                            <Statistic color='teal'>
                                <Statistic.Value>{this.state.blance} ETH</Statistic.Value>
                            </Statistic>
                        </Card.Content>
                        <Button animated='fade' onClick={this.enter} loading={this.state.loading}
                                disabled={this.state.loading}>
                            <Button.Content visible>投 注</Button.Content>
                            <Button.Content hidden>1个ETH</Button.Content>
                        </Button>
                        <Card.Content extra style={{display: this.state.showButton}}>
                            <div className='ui two buttons'>
                                <Button basic color='green'
                                        onClick={this.pickWinner}
                                        loading={this.state.pickWinnerLoading}
                                        disabled={this.state.managerDisable}>开奖</Button>
                                <Button basic color='red'
                                        onClick={this.refund}
                                        loading={this.state.refundLoading}
                                        disabled={this.state.managerDisable}>退款</Button>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src='/images/eos.jpg'/>
                        <Card.Content>
                            <Card.Header>EOS彩票</Card.Header>
                            <Card.Meta>
                                <p>管理员地址:</p>
                                <Label size="mini">
                                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                </Label>
                            </Card.Meta>
                            <Card.Description>每周三晚上8点准时开奖</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                目前参与人数: 22 人
                            </a>
                        </Card.Content>
                        <Card.Content>
                            <Card.Meta>
                                <span>奖池累计奖金</span>
                            </Card.Meta>
                            <Statistic color='teal'>
                                <Statistic.Value>27 EOS</Statistic.Value>
                            </Statistic>
                        </Card.Content>
                        <Button animated='fade'>
                            <Button.Content visible>投 注</Button.Content>
                            <Button.Content hidden>1个EOS</Button.Content>
                        </Button>
                        <Card.Content extra style={{display: 'none'}}>
                            <div className='ui two buttons'>
                                <Button basic color='green'>开奖</Button>
                                <Button basic color='red'>退款</Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Container>
        );
    }
}

export default App;
