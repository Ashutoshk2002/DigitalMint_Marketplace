import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import "./Create.css";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
// const pinataSDK = require('@pinata/sdk');
// const pinata = pinataSDK('a1496898443a0c32596a', 'cef34f14216f5e1067cfcf08c035cf787c3e938c837708915ba77804ea66aee3');

const Create = ({ marketplace, nft }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const PINATA_API_KEY = "2c6d3858d619c7e67f7a";
  const PINATA_API_SECRET =
    "10a2fe59f553c4505aaae42f65aed8766d29c659a372ec37bcb7b07a4f4e9fb7";
  // const uploadToIPFS = async (event) => {
  //   event.preventDefault()
  //   const file = event.target.files[0]
  //   if (typeof file !== 'undefined') {
  //     try {
  //       const result = await client.add(file)
  //       console.log(result)
  //       setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
  //     } catch (error) {
  //       console.log("ipfs image upload error: ", error)
  //     }
  //   }
  // }
  //
  const uploadToPinata = async (data) => {
    const formData = new FormData();
    formData.append("file", data);

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
          },
        }
      );
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error.message);
      throw error;
    }
  };

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (typeof file !== "undefined") {
      try {
        const ipfsHash = await uploadToPinata(file);
        setImage(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
      } catch (error) {
        console.log("Pinata image upload error: ", error);
      }
    }
  };
  //
  const uploadToPinataJson = async (data) => {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
          },
        }
      );
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading JSON to Pinata Json:", error.message);
      throw error;
    }
  };
  // const createNFT = async () => {
  //   if (!image || !price || !name || !description) return
  //   try {
  //     const result = await client.add(JSON.stringify({ image, price, name, description }))
  //     mintThenList(result)
  //   } catch (error) {
  //     console.log("ipfs uri upload error: ", error)
  //   }
  // }

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      // Upload data to Pinata
      const ipfsHash = await uploadToPinataJson(
        JSON.stringify({ image, price, name, description })
      );

      try {
        await mintThenList(ipfsHash);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
      console.log("I am executing");
    } catch (error) {
      console.log("Pinata upload error: ", error);
    }
  };

  const mintThenList = async (result) => {
    // const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    const uri = `https://gateway.pinata.cloud/ipfs/${result}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    console.log("id", id);
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    console.log("listingPrice", listingPrice);

    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="sm"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                size="sm"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="sm"
                required
                type="number"
                placeholder="Price in ETH"
              />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="sm">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
