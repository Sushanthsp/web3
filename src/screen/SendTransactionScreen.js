import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    SafeAreaView,
  } from 'react-native';import Web3 from 'web3';

const SendTransactionScreen = () => {
  const [transactionValue, setTransactionValue] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleSendTransaction = async () => {
    try {
      const privateKey = '8b54eb9ddfbbcf5ab51118c505f8cd8941148e77322db5446e8f1754ffd459ae';

      const provider = new Web3.providers.HttpProvider('https://eth-mainnet.g.alchemy.com/v2/wRk0fwVGgXuFkzW8goTwi9OdhHMaqs38'); // Replace with your own Infura project ID
      const web3 = new Web3(provider);
      const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);

      const gasPrice = '20';

      const txObject = {
        to: toAddress,
        value: web3.utils.toWei(transactionValue, 'ether'),
        gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
        gas: 2000000,
      };

      const signedTx = await wallet.signTransaction(txObject);

      const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      if (txReceipt.status === '0x1' || txReceipt.status === '0x01') {
        setTransactionStatus('Transaction completed!');
      } else {
        setTransactionStatus('Transaction failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.logoText}>Web5</Text>
    <TextInput
      style={styles.input}
      placeholder="Transaction Value"
      value={transactionValue}
      onChangeText={setTransactionValue}
      placeholderTextColor="white"
    />
    <TextInput
      style={styles.input}
      placeholder="To Address"
      value={toAddress}
      onChangeText={setToAddress}
      placeholderTextColor="white"
    />
    <TouchableOpacity style={styles.button} onPress={handleSendTransaction}>
          <Text style={styles.buttonText}>Send Transaction</Text>
        </TouchableOpacity>
        {transactionStatus !== '' && (
          <Text style={styles.transactionStatus}>{transactionStatus}</Text>
        )}
    {transactionStatus !== '' && (
      <Text style={styles.transactionStatus}>{transactionStatus}</Text>
    )}
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#254CDD', // Violet background color
      padding: 16,
    },
    logoText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      height: 40,
      backgroundColor: 'white', // White background color for text input
      color: 'black', // Black text color
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'white', // White border color
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    transactionStatus: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green',
    },
    button: {
        width: '100%',
        borderRadius: 4,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: 'blue', // You can customize the button color here
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold', // Add font weight here
      },
  });
  
  export default SendTransactionScreen;
 
