import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import firebase from "../config";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome from react-native-vector-icons

const database = firebase.database();
const ref_lesMessage = database.ref("Discussions");

export default function Chat(props) {
  const currentUser = props.route.params.currentUser;
  const secondUser = props.route.params.secondUser;

  // Générer un identifiant unique pour la discussion entre les deux utilisateurs
  const iddisc =
    currentUser.id > secondUser.id
      ? currentUser.id + secondUser.id
      : secondUser.id + currentUser.id;

  const ref_unedisc = ref_lesMessage.child(iddisc);

  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Vérifier si les données de l'utilisateur sont disponibles
  useEffect(() => {
    if (!currentUser || !secondUser) {
      console.error("User data is missing!");
      return; // Exit early if user data is missing
    }

    const listener = ref_unedisc.on("value", (snapshot) => {
      const d = [];
      snapshot.forEach((message) => {
        d.push(message.val());
      });
      setData(d);
    });

    return () => ref_unedisc.off("value", listener);
  }, [currentUser, secondUser]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const key = ref_unedisc.push().key;
    const ref_unmessage = ref_unedisc.child(key);
    ref_unmessage.set({
      body: newMessage,
      time: new Date().toLocaleString(),
      sender: currentUser,
      receiver: secondUser.id,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      {/* Chat Header with profile image and call icons */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.profilePicture}>
            <Text style={styles.profileText}>
              {secondUser.nom ? secondUser.nom[0] : ''} {/* Display first letter of the name */}
            </Text>
          </View>
          <View>
            <Text style={styles.headerText}>
              {secondUser.nom ? secondUser.nom : ''} {/* Display full name */}
            </Text>
            <Text style={styles.statusText}>Last seen today at 3:00 PM</Text>
          </View>
        </View>

        {/* Icons for voice and video call */}
        <View style={styles.callIcons}>
          <TouchableOpacity onPress={() => console.log("Voice Call pressed")}>
            <Icon name="phone" style={styles.callIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Video Call pressed")}>
            <Icon name="video-camera" style={styles.callIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === currentUser.id
                ? styles.messageSent
                : styles.messageReceived,
            ]}
          >
            <Text style={styles.messageText}>
              {item.body ? item.body : ''} {/* Ensure item.body is a string */}
            </Text>
            <Text style={styles.messageTime}>
              {item.time ? item.time : ''} {/* Ensure item.time is a string */}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<View style={{ padding: 10 }} />}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <Button onPress={sendMessage} title="Envoyer" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#007BFF", // Change to blue
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between", // Spread icons apart
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileText: {
    fontSize: 18,
    color: "#007BFF", // Change text color for the first letter
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
  },
  callIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  callIcon: {
    fontSize: 25,
    color: "#fff",
    marginLeft: 23, // Space between icons
  },
  messagesContainer: {
    paddingVertical: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
    alignSelf: "flex-start",
  },
  messageSent: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  messageReceived: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
});