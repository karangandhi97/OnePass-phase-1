import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Clipboard,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "./fonts";
import { newcss } from "./newcss";
import { ScrollView } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import axios from "axios";
function Generator() {
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.reducer.rerender);
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [slider, setSlider] = useState(8); //size of password
  const [isUpper, setUpper] = useState(false);
  const [isLower, setLower] = useState(true);
  const [isNumber, setNumber] = useState(false);
  const [isSpecial, setSpecial] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [generalchar, setGeneralchar] = useState(true);
  const [specialchar, setSpecialchar] = useState(false);
  const [parenthesis, setParenthesis] = useState(false);
  const [password, setPassword] = useState("defaultvalue");

  const touchupper = () => {
    setUpper(!isUpper);
  };
  const touchlower = () => {
    setLower(!isLower);
  };
  const touchnumber = () => {
    setNumber(!isNumber);
  };
  const touchspecialchar = () => {
    setSpecialchar(!specialchar);
  };
  const touchgeneralchar = () => {
    setGeneralchar(!generalchar);
  };
  const touchbrackets = () => {
    setParenthesis(!parenthesis);
  };
  const touchspecial = () => {
    setSpecial(!isSpecial);
  };
  const generatePassword = () => {
    let exclude = `${!generalchar ? "!@#$%^&*" : null}${
      !specialchar ? '-.,"?_`~;:+=<>|/' : null
    }${!parenthesis ? "(){}[]" : null}`;

    axios
      .post("http://10.0.0.9:3000/generatepass", {
        length: slider,
        numbers: isNumber,
        lowercase: isLower,
        uppercase: isUpper,
        symbols: isSpecial,
        exclude: exclude,
      })
      .then((res) => {
        setPassword(res.data);
      });
  };
  useEffect(() => {
    axios
      .post("http://10.0.0.9:3000/generatepass", {
        length: 6,
        numbers: false,
        lowercase: true,
        uppercase: false,
        symbols: false,
        exclude: "!@#$%^&*-.,?_`~;:+=<>|/(){}[]",
      })
      .then((res) => {
        setPassword(res.data);
      });
    // if(rerender){
    //   generatePassword()
    //   dispatch({type:"RERENDER",data:false})
    // }
  }, [setPassword]);
  useEffect(() => {
    if (rerender) {
      generatePassword();
      dispatch({ type: "RERENDER", data: false });
    }
  }, [rerender, dispatch, generatePassword]);
  const copyPass = () => {
    if (password === "defaultvalue") {
      alert("Please Generate a password first");
    } else {
      Clipboard.setString(password);
    }
  };
  const symbolsetting = () => {
    setCharacters(!characters);
  };
  if (!isSpecial && characters) {
    setCharacters(!characters);
  }
  return (
    <View style={styles.background}>
      <ScrollView
        style={
          ([styles.scroll], { align: "center", backgroundColor: "#c3ccea" })
        }
      >
        <View style={styles.header2}>
          <Text style={styles.heading}>Generator</Text>
        </View>
        {/* 1. slider value is stored inside 'slider'
                 2. each checkbox has different states. at least 1 checkbox has to be
                checked by default. (lowercase). 
                DONE AT END: User cannot uncheck all boxes. 
                3. Click on generate password to generate password and store it inside 'password'
                4. click on copy password to copy the password.
                5. Click on the password itself to copy password.*/}

        <TouchableOpacity
          style={styles.generatedpasswordspace}
          onPress={copyPass}
        >
          <Text style={styles.generatedpassword}>{password}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.profilecard,
            {
              backgroundColor: "#b99aff",
              borderRadius: 1,
              borderBottomWidth: 1,
            },
          ]}
          onPress={generatePassword}
        >
          <Text style={styles.profilecardtext}>Generate Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.profilecard,
            {
              backgroundColor: "#b99aff",
              borderRadius: 1,
              borderBottomWidth: 1,
            },
          ]}
          onPress={copyPass}
        >
          <Text style={styles.profilecardtext}>Copy Password</Text>
        </TouchableOpacity>

        <Slider
          style={styles.passwordslider}
          minimumValue={8}
          maximumValue={128}
          minimumTrackTintColor="#b99aff"
          maximumTrackTintColor="#949494"
          thumbTintColor="#5970ce"
          value={8}
          step={1}
          onValueChange={(value) => setSlider(value)}
        />

        <View style={styles.generatorpreference}>
          <Text style={styles.profilecardtext}>Password Length</Text>
          <Text style={styles.profilecardtext}>{slider}</Text>
        </View>

        <View style={styles.generatorpreference}>
          <TouchableOpacity
            style={styles.generatorpreference}
            onPress={touchupper}
          >
            <Text style={styles.profilecardtext}>Upper Case</Text>

            <Checkbox
              style={
                (styles.checkbox,
                {
                  marginTop: "0.7%",
                  marginRight: "4.7%",
                })
              }
              value={isUpper}
              onValueChange={setUpper}
              color={isUpper ? "#5970ce" : undefined}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generatorpreference}>
          <TouchableOpacity
            style={styles.generatorpreference}
            onPress={touchlower}
          >
            <Text style={styles.profilecardtext}>Lower Case</Text>
            <Checkbox
              style={
                (styles.checkbox,
                {
                  marginTop: "0.7%",
                  marginRight: "4.7%",
                })
              }
              value={isLower}
              onValueChange={setLower}
              color={isLower ? "#5970ce" : undefined}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generatorpreference}>
          <TouchableOpacity
            style={styles.generatorpreference}
            onPress={touchnumber}
          >
            <Text style={styles.profilecardtext}>Number</Text>
            <Checkbox
              style={
                (styles.checkbox,
                {
                  marginTop: "0.7%",
                  marginRight: "4.7%",
                })
              }
              value={isNumber}
              onValueChange={setNumber}
              color={isNumber ? "#5970ce" : undefined}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generatorpreference}>
          <TouchableOpacity
            style={styles.generatorpreference}
            onPress={touchspecial}
          >
            <Text style={styles.profilecardtext}>Special Characters</Text>
            <Checkbox
              style={
                (styles.checkbox,
                {
                  marginTop: "0.7%",
                  marginRight: "4.7%",
                })
              }
              value={isSpecial}
              onValueChange={setSpecial}
              color={isSpecial ? "#5970ce" : undefined}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generatorpreference}>
          <TouchableOpacity
            style={[styles.profilecard, { flex: 1 }]}
            onPress={symbolsetting}
            disabled={!isSpecial}
          >
            <Text style={styles.profilecardtext}>
              Special Character Preference
            </Text>
          </TouchableOpacity>
        </View>
        {characters ? (
          <>
            <View style={styles.generatorpreference}>
              <TouchableOpacity
                style={styles.generatorpreference}
                onPress={touchgeneralchar}
              >
                <Text style={styles.profilecardtext}>
                  General Characters (!@#$%^&*)
                </Text>
                <Checkbox
                  style={
                    (styles.checkbox,
                    {
                      marginTop: "0.7%",
                      marginRight: "4.7%",
                    })
                  }
                  value={generalchar}
                  onValueChange={setGeneralchar}
                  color={generalchar ? "#5970ce" : undefined}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.generatorpreference}>
              <TouchableOpacity
                style={styles.generatorpreference}
                onPress={touchspecialchar}
              >
                <Text style={styles.profilecardtext}>
                  Special Characters (-.?_`~;:+=)
                </Text>
                <Checkbox
                  style={
                    (styles.checkbox,
                    {
                      marginTop: "0.7%",
                      marginRight: "4.7%",
                    })
                  }
                  value={specialchar}
                  onValueChange={setSpecialchar}
                  color={specialchar ? "#5970ce" : undefined}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.generatorpreference}>
              <TouchableOpacity
                style={styles.generatorpreference}
                onPress={touchbrackets}
              >
                <Text style={styles.profilecardtext}>Parenthesis ((){}[])</Text>
                <Checkbox
                  style={
                    (styles.checkbox,
                    {
                      marginTop: "0.7%",
                      marginRight: "4.7%",
                    })
                  }
                  value={parenthesis}
                  onValueChange={setParenthesis}
                  color={parenthesis ? "#5970ce" : undefined}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        {!isUpper && !isLower && !isNumber && !isSpecial
          ? setLower(true)
          : null}
        {!generalchar && !specialchar && !parenthesis
          ? setGeneralchar(true)
          : null}
      </ScrollView>
    </View>
  );
}
export default Generator;