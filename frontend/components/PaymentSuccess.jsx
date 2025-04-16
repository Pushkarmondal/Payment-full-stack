import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, Wallet, Clock } from "lucide-react";

export const PaymentSuccess = () => {
      const generateTxnId = () => {
        const randomStr = Math.random()
          .toString(36)
          .substr(2, 10)
          .toUpperCase(); 
        return `TXN-${randomStr}`;
      };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 transform transition-all duration-500 hover:shadow-2xl">
          {/* Success Animation */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 animate-ping bg-green-400 rounded-full opacity-25 w-24 h-24"></div>
              <div className="relative animate-bounce">
                <div className="absolute inset-0 bg-green-100 rounded-full w-24 h-24"></div>
                <CheckCircle className="w-24 h-24 text-green-500 relative z-10" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
              Payment Successful!
            </h2>
            <p className="text-gray-600 text-xl">
              Your transaction has been processed successfully
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>Transaction Time</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date().toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Wallet className="w-5 h-5" />
                    <span>Transaction ID</span>
                  </div>
                  <p className="text-lg font-mono font-semibold text-gray-800">
                        {generateTxnId()}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              <div className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-medium flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Transaction Completed</span>
              </div>
            </div>
          </div>

          {/* Redirect Message */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center space-x-2 text-green-600 bg-green-50 px-6 py-3 rounded-full animate-pulse">
              <span className="text-lg">Redirecting to dashboard</span>
              {/* <ArrowRight className="w-5 h-5" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
