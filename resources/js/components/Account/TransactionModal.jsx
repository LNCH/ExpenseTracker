import React, {useState} from 'react'
import Modal from "../Modal";
import PlusSquaresIcon from "../Icons/PlusSquaresIcon";
import RadioGroup from "../Form/RadioGroup";
import FormGroup from "../Form/FormGroup";
import Label from "../Form/Label";
import PrimaryButton from "../Buttons/PrimaryButton";
import TransactionsService from "../../services/TransactionsService";
import TextInput from "../Form/TextInput";

const TransactionModal = (props) => {
    const [type, setType] = useState(null)

    const handleSubmit = () => {
        TransactionsService.createTransaction(props.accountId, {
            type: type
        }).then(response => {
            console.log(response)
            onSubmit()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onSubmit = () => {
        props.onSubmit()
    }

    return (
        <Modal
            renderHeader="New Transaction"
            renderTrigger={() => (
                <span className="flex items-center gap-x-1">
                    <PlusSquaresIcon /> New Transaction
                </span>
            )}
        >
            <FormGroup>
                <Label>Type</Label>

                <RadioGroup
                    name="type"
                    options={[
                        {label: 'Income', value: 'income'},
                        {label: 'Expense', value: 'expense'},
                        {label: 'Transfer', value: 'transfer'}
                    ]}
                    onChange={(event) => setType(event.target.value)}
                />
            </FormGroup>

            {type ? (
                <FormGroup>
                    <Label>
                        {type === 'transfer' ? 'Target Account' : 'Payee'}
                    </Label>
                    <TextInput name="payee" />
                </FormGroup>
            ) : null}

            <PrimaryButton onClick={handleSubmit}>
                Create Transaction
            </PrimaryButton>
        </Modal>
    )
}

TransactionModal.defaultProps = {
    onSubmit: () => {}
}

export default TransactionModal
