const {Builder, By, Key, until} = require('selenium-webdriver');
const edge = require("@microsoft/edge-selenium-tools");
let options = new edge.Options();
options.setEdgeChromium(true);

var user = {
    name: 'admin',
    password: 'e1o9m9u9r'
};

let driver =  edge.Driver.createSession(options);
driver.get('http://localhost:8080/home');
//Llenar el campo Usuario de la pagina de login
driver.findElement(By.name('user')).sendKeys(user.name);
//Llenar el campo Contraseña de la pagina de login y presionar ENTER
driver.findElement(By.name('password')).sendKeys(user.password,Key.ENTER);
//Navegar a la pestaña de pacientes
driver.findElement(By.linkText("Pacientes")).click();
//Navegar a la pestaña Nuevo
driver.findElement(By.name("newPatient")).click();
//Rellenar el formulario con el campo identificacion lleno de m's
var form = driver.findElement(By.name('pacienteAdd'));
async function identificationFilledWithM(){
    await form.findElement(By.name('userName')).sendKeys('Mauro Oliver');
    await form.findElement(By.name('userLastName')).sendKeys('Pettyn Garcia');
    await form.findElement(By.name('userIde')).sendKeys('mmmmmmmmmmmmmm');
    await form.findElement(By.name('userBirth')).sendKeys('14041999');
    await form.findElement(By.id('sexoM')).click();
    await form.findElement(By.id('estadoS')).click();
    await form.findElement(By.name('userTel')).sendKeys('22993998');
    await form.findElement(By.name('userBarrio')).sendKeys('Donde la vida no vale nada');
    await form.findElement(By.name('userCiudad')).sendKeys('Managua');
    await form.findElement(By.name('userDomicilio')).sendKeys('Del semaforo del mercado, 2 c al sur, 1c al este, 4 al lago');
    setTimeout(async()=>{await form.findElement(By.className('btn btn-secondary mt-3 ml-0')).click();},3000)
}
async function patienInsertionCorrect(){
    await form.findElement(By.name('userName')).sendKeys('Mauro Oliver');
    await form.findElement(By.name('userLastName')).sendKeys('Pettyn Garcia');
    await form.findElement(By.name('userIde')).sendKeys('0011404991008Z');
    await form.findElement(By.id('sexoM')).click();
    await form.findElement(By.id('estadoS')).click();
    await form.findElement(By.name('userTel')).sendKeys('22993998');
    await form.findElement(By.name('userBarrio')).sendKeys('Vida no vale nada');
    await form.findElement(By.name('userCiudad')).sendKeys('Managua');
    await form.findElement(By.name('userDomicilio')).sendKeys('Del semaforo del mercado, 2 c al sur, 1c al este, 4 al lago');
    setTimeout(async()=>{await form.findElement(By.className('btn btn-secondary mt-3 ml-0')).click();},3000)
}
async function identificationEmpty(){
    await form.findElement(By.name('userName')).sendKeys('Mauro Oliver');
    await form.findElement(By.name('userLastName')).sendKeys('Pettyn Garcia');
    await form.findElement(By.name('userIde')).sendKeys('');
    await form.findElement(By.name('userBirth')).sendKeys('14041999');
    await form.findElement(By.id('sexoM')).click();
    await form.findElement(By.id('estadoS')).click();
    await form.findElement(By.name('userTel')).sendKeys('22993998');
    await form.findElement(By.name('userBarrio')).sendKeys('Donde la vida no vale nada');
    await form.findElement(By.name('userCiudad')).sendKeys('Managua');
    await form.findElement(By.name('userDomicilio')).sendKeys('Del semaforo del mercado, 2 c al sur, 1c al este, 4 al lago');
    await form.findElement(By.className('btn btn-secondary mt-3 ml-0')).click();
}
async function identificationFilledWithAnAdditionalLetter(){
    await form.findElement(By.name('userName')).sendKeys('Mauro Oliver');
    await form.findElement(By.name('userLastName')).sendKeys('Pettyn Garcia');
    await form.findElement(By.name('userIde')).sendKeys('0011404991008GA');
    await form.findElement(By.name('userBirth')).sendKeys('14041999');
    await form.findElement(By.id('sexoM')).click();
    await form.findElement(By.id('estadoS')).click();
    await form.findElement(By.name('userTel')).sendKeys('22993998');
    await form.findElement(By.name('userBarrio')).sendKeys('Donde la vida no vale nada');
    await form.findElement(By.name('userCiudad')).sendKeys('Managua');
    await form.findElement(By.name('userDomicilio')).sendKeys('Del semaforo del mercado, 2 c al sur, 1c al este, 4 al lago');
    await form.findElement(By.className('btn btn-secondary mt-3 ml-0')).click();
}
//setTimeout(identificationEmpty,2000);
//setTimeout(identificationFilledWithAnAdditionalLetter,2000);
setTimeout(identificationFilledWithM,2000);
//setTimeout(patienInsertionCorrect,2000);

