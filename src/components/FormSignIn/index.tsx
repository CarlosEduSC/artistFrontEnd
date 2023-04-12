import { pxToRem } from "../../utils/convertToRem.util";
import { Button } from "../Button";
import { Input } from "../Input";
import { Text } from "../Text"
import { TextLabel } from "../TextLabel";
import { Container, FormContainer, InputLabelContainer } from "./styles";
import { useState } from "react";
import { ILogin } from "../../interfaces/ILogin";
import { api } from "../../services/api.service";
import { ILocalStorage } from "../../interfaces/ILocalStorage";
import { useHistory } from "react-router-dom";
import { IError } from "../../interfaces/IError";

function handleError(data: IError) {
   console.log(data)
}

export function FormSingIn() {
   const [formData, setFormData] = useState<ILogin>({} as ILogin);
   const history = useHistory();

   function handleLogin(data: ILocalStorage) {
      console.log(data)

      localStorage.setItem('name', data.name);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_type', data.user_type)
      history.push("/home");
   }

   const handleSubmit = async () => {

      const data = {
         username: formData.username,
         password: formData.password
      };

      await api.post("/login", data).then(response => {
         if (response.status == 200){
            handleLogin(
               response.data
            )
            }
      }).catch(resposta => {
         console.log('erro - ', resposta)

         if (resposta.code == "ERR_BAD_REQUEST"){
            alert("Usuario ou senha invalidos")      
            console.log("asdasdadasdas")            
         }
      })
   }

   return (
      <>
         <Container>

            <Text color="#FFFFFF" fontSize={pxToRem(80)} style={{ textAlign: "center" }}>Arte é isso, arte é aqui!</Text>

            <FormContainer>
               <InputLabelContainer>
                  <TextLabel 
                     style={{
                     color: "#FFFFFF",
                     fontFamily: "Nunito",
                     fontSize: pxToRem(20),
                     fontWeight: 600,
                  }}>Username:</TextLabel>

                  <Input placeholder="João" className="inputName" 
                     onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                     value={formData.username}
                     style={{
                     width: pxToRem(548),
                     height: pxToRem(32),
                     borderRadius: pxToRem(8),
                     background: "#EFF4F9"
                  }}
                  />

                  <TextLabel style={{
                     color: "#FFFFFF",
                     fontFamily: "Nunito",
                     fontSize: pxToRem(20),
                     fontWeight: 600,
                  }}>Senha:</TextLabel>

                  <Input placeholder="**********" className="inputName" 
                     onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                     value={formData.password}
                     type="password"
                     style={{
                     width: pxToRem(548),
                     height: pxToRem(32),
                     borderRadius: pxToRem(8),
                     background: "#EFF4F9"
                  }}
                  />
               </InputLabelContainer>

               <Button 
                  onClick={handleSubmit}
                  style={{
                  color: '#FFF',
                  margin: "0 auto"
               }}>Login</Button>
            </FormContainer>

            <Text color="#FFFFFF" fontSize={pxToRem(25)} style={{ textAlign: "center" }}>Entre para a festa você tambem!!</Text>

         </Container>
      </>
   )
}