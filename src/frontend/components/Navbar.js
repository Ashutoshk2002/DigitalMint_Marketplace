import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import market from "./market.png";

import './Navbar.css'
const Navigation = ({ web3Handler, account }) => {
<<<<<<< HEAD
  return (
    <Navbar expand="lg" className="navbar" variant="light">
      <Container>
        <Navbar.Brand href="http://www.dappuniversity.com/bootcamp">
          <img src={market} width="40" height="40" className="" alt="" />
          &nbsp; Digital Mint Marketplace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create
            </Nav.Link>
            <Nav.Link as={Link} to="/my-listed-items">
              My Listed Items
            </Nav.Link>
            <Nav.Link as={Link} to="/my-purchases">
              My Purchases
            </Nav.Link>
            <Nav.Link as={Link} to="/transactions">
              Transactions
            </Nav.Link>
          </Nav>
          <Nav>
            {account ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button nav-button btn-sm mx-4"
              >
                <Button variant="outline-light">
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button onClick={web3Handler} variant="outline-light">
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
=======
    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#">
                    <img src={market} width="40" height="40" className="" alt="" />
                    &nbsp; DigitalMint Marketplace
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
                        <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>
>>>>>>> 08435c223fcf4b6263f2601cb873cc8a6c9fda5d

export default Navigation;
