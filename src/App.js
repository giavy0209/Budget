import React from 'react';
import io from 'socket.io-client/dist/socket.io';
import './asset/css/App.css';
import Loading from './Component/Loading'
import Top from './Component/Top'
import Add from './Component/Add'
import Listbudget from './Component/Listbudget'
import FormatNumber from './Component/FormatNumber'

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000
};
const socket = io('http://localhost:3008/',connectionConfig);

function App() {
  const [DisplayLoading,changeDisplayLoading] = React.useState('none');
  const [BudgetIncome,changeBudgetIncome] = React.useState([]);
  const [BudgetExpenses,changeBudgetExpenses] = React.useState([]);
  const [Income,changeIncome] = React.useState(0);
  const [Expenses,changeExpenses] = React.useState(0);
  const [AddValue,changeAddValue] = React.useState(0);
  const [AddDes,changeAddDes] = React.useState('');
  const [IsAddIncome,changeIsAddIncome] = React.useState(true);
  React.useEffect(()=>socket.on('res-budget',budget=>{
    var totalIncome = 0;
    var totalExpense = 0;
    budget.forEach(o=>{
      if(o.isIncome){
        totalIncome += o.value;
        BudgetIncome.push(o);
        changeBudgetIncome([...BudgetIncome])
      }else{
        totalExpense += o.value
        BudgetExpenses.push(o);
        changeBudgetExpenses([...BudgetExpenses])
      }
    })
    changeIncome(totalIncome)
    changeExpenses(totalExpense)
  }),[])
  
  return(
    <>
    <Top
    Income={Income}
    Expenses={Expenses}
    FormatNumber={FormatNumber}
    />
    <div className="bottom">
      <Add
      changeDisplayLoading={changeDisplayLoading}
      socket={socket}
      Income={Income}
      changeIncome={changeIncome}
      Expenses={Expenses}
      changeExpenses={changeExpenses}
      AddValue={AddValue}
      changeAddValue={changeAddValue}
      AddDes={AddDes}
      changeAddDes={changeAddDes}
      IsAddIncome={IsAddIncome}
      changeIsAddIncome={changeIsAddIncome}
      BudgetIncome={BudgetIncome}
      changeBudgetIncome={changeBudgetIncome}
      BudgetExpenses={BudgetExpenses}
      changeBudgetExpenses={changeBudgetExpenses}
      />
      <Listbudget
      changeDisplayLoading={changeDisplayLoading}
      socket={socket}
      Income={Income}
      changeIncome={changeIncome}
      Expenses={Expenses}
      changeExpenses={changeExpenses}
      BudgetIncome={BudgetIncome}
      changeBudgetIncome={changeBudgetIncome}
      BudgetExpenses={BudgetExpenses}
      changeBudgetExpenses={changeBudgetExpenses}
      Income={Income}
      FormatNumber={FormatNumber}
      />
    </div>
    <Loading DisplayLoading={DisplayLoading}/>
    </>
  )
}

export default App;
