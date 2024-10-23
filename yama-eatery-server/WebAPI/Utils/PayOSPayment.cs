using Net.payOS;
using Net.payOS.Types;
using WebAPI.Models;

namespace WebAPI.Utils
{
    public static class PayOSPayment
    {
        private const string clientId = "e85d60fc-e085-4c20-8225-a5533ecbf9ae";
        private const string apiKey = "66ff80a7-c2fb-45a6-b099-a92b04ed9288";
        private const string checksumKey = "753f6c123cd2962a71c0c5f5e54c76460d6310aefd365f29fae599d72412881e";
        private readonly static PayOS payOS = new(clientId, apiKey, checksumKey);

        public static async Task<string?> GeneratePaymentLink(IUnitOfWork unitOfWork, Guid bookingId)
        {
            try
            {
                var booking = await unitOfWork.BookingRepository.GetByGuidAsync(bookingId, ["BookingDetails", "BookingDetails.Product"]);
                if (booking == null)
                {
                    return null;
                }

                var orderCode = int.Parse(booking.NewPaymentDate.ToString("fffffff"));
                var description = $"Pay for booking deposit";
                var items = new List<ItemData>();
                foreach (var item in booking.BookingDetails)
                {
                    items.Add(new ItemData(item.Product.Name, item.Quantity, (int)Math.Ceiling(item.Quantity * item.Product.Price)));
                }
                var cancelURL = "http://localhost:3000/";
                var successURL = "http://localhost:3000/?bookingId=" + bookingId;

                PaymentData paymentData = new(orderCode, 5000, description, items, cancelURL, successURL);
                CreatePaymentResult paymentResult = await payOS.createPaymentLink(paymentData);
                return paymentResult.checkoutUrl;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static async Task<PaymentLinkInformation> GetPaymentInformation(this Booking booking)
        {
            var orderCode = int.Parse(booking.NewPaymentDate.ToString("fffffff"));
            return await payOS.getPaymentLinkInformation(orderCode);
        }
    }
}
