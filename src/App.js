import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const user =  {
  id: new Uint8Array([0x01, 0x02, 0x03, 0x04]),
  name: "john78",
  displayName: "John",
};

const challenge = new Uint8Array([
  0x8c, 0x0a, 0x26, 0xff,
]).buffer;

let algorithms = '-7,-257,-258,-259';

const create = async () => {
  const publicKeyCredentialCreationOptions = {
    challenge,
    rp: {
      name: "Example",
      id: window.location.hostname,
    },
    user,
    pubKeyCredParams: algorithms.split(',').map((alg) => ({alg: parseInt(alg), type: "public-key"})),
    // excludeCredentials: [{
    //   id: new Uint8Array([0x01, 0x02, 0x03, 0x04]),
    //   type: 'public-key',
    //   transports: ['usb'],
    // }],
    // authenticatorSelection: {
    //   "authenticatorAttachment": "cross-platform",
    //   "requireResidentKey": false,
    //   // userVerification: "required",
    // }
  };

  const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions
  });

  console.log(credential);
  console.log("authenticatorData", credential.response.getAuthenticatorData());
  console.log("publicKey", credential.response.getPublicKey());
  console.log("algorithm", credential.response.getPublicKeyAlgorithm());
  console.log("transports", credential.response.getTransports());
}

const get = async () => {
  const publicKeyCredentialCreationOptions = {
    challenge,
    rpId: window.location.hostname,
  };

  const credential = await navigator.credentials.get({
    publicKey: publicKeyCredentialCreationOptions
  });

  console.log(credential);
  console.log("signature", new Uint8Array(credential.response.signature));
  console.log("userHandle", new Uint8Array(credential.response.userHandle));
}

function App() {
  return (
    <div className="App">
        <label>
          Algorithms <a href="https://www.iana.org/assignments/cose/cose.xhtml#algorithms">COSE Algorithms</a>:
          <input type="text" defaultValue={algorithms} onChange={event => algorithms = event.target.value} />
        </label>
        <br />
        <button onClick={create}>Create</button>
        <button onClick={get}>Get</button>
    </div>
  );
}

export default App;
