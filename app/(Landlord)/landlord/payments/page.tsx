
import { allPayments } from '../../_actions/landlordActions';

const PaymentPage = async () => {

    const payments = await allPayments()
    console.log(payments)
    return (
        <div>
            <h1>Payment Page</h1>
        </div>
    )
}

export default PaymentPage
