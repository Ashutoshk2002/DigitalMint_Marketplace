import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

<<<<<<< HEAD
  const [transaction, setTransaction] = useState({});
=======
  const [transaction, setTransaction] = useState([])
>>>>>>> 08435c223fcf4b6263f2601cb873cc8a6c9fda5d

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setLoading(false);
    setItems(items);
  };

  const buyMarketItem = async (item) => {
<<<<<<< HEAD
    const data = await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    console.log(data);
    setTransaction(data);
    console.log(transaction);
    navigate("/transactions", { state: transaction });
    loadMarketplaceItems();
  };
=======
    try {
      const data = await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
      console.log(data);

      const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

      // Append the new transaction to the existing array
      const updatedTransactions = [...existingTransactions, data];

      // Store the updated array back in localStorage
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      console.log(transaction)
      loadMarketplaceItems()
      navigate('/transactions',);
    } catch (error) {
      console.log(error)
    }

  }
>>>>>>> 08435c223fcf4b6263f2601cb873cc8a6c9fda5d

  useEffect(() => {
    loadMarketplaceItems();
  }, []);
  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Spinner
            animation="grow"
            variant="primary"
            style={{ display: "flex" }}
          />
          <p className="mx-3 my-0">Loading...🚀</p>
        </div>
      </main>
    );
  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card className='border border-secondary'>
                  <Card.Img variant="top" src={item.image} className='border-bottom border-secondary border-2 p-1' />
                  <Card.Body color="secondary">
<<<<<<< HEAD
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.itemId._hex}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-grid">
                      <Button
                        onClick={() => buyMarketItem(item)}
                        variant="primary"
                        size="lg"
                      >
=======
                    <Card.Title className='mt-0 pt-0'>{item.name}</Card.Title>
                    <Card.Text className='mb-0'>
                      {item.description}
                    </Card.Text>
                    <Card.Text className='pt-0'>
                      {item.itemId._hex}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="sm">
>>>>>>> 08435c223fcf4b6263f2601cb873cc8a6c9fda5d
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
};
export default Home;
