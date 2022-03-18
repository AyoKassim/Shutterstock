from pytrends.request import TrendReq
import sys

pytrend = TrendReq()
total = 0
weeks = 2       ##variable for the amount weeks we want to check the trending score for
amount_of_trends = len(sys.argv)
for x in range(1, amount_of_trends):
    pytrend.build_payload(kw_list=[sys.argv[x]])
    interest_over_time_df = pytrend.interest_over_time()
    data_tail = interest_over_time_df.tail(weeks)

    temp = data_tail.nlargest(10, sys.argv[x])
    total = total + temp[sys.argv[x]].sum()

print(total/(weeks*(amount_of_trends-1)*100), end='')