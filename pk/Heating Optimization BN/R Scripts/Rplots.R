library(lubridate)
library(ggplot2)
library(dplyr)

# setwd('D:/Energy Lancaster/Bowland North Model/')
df_term = read.csv('df_term.csv')

#conversions
df_term$ts = as.POSIXct(df_term$ts)
df_term$INS = as.numeric(df_term$INS)
df_term$hour = as.numeric(df_term$hour)
df_term$month = factor(df_term$month, levels = c(1,2,3,4,5,12), labels=c('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Dec'))
df_term$is_weekend = as.factor(df_term$is_weekend)

df_term = df_term[order(df_term$ts),] 
group_by(df_term, ts)
#plots
#Internal room temperature over multiple term days / month
g1 = ggplot(df_term) + geom_point(aes(hour, INS, color=is_weekend)) + stat_smooth(aes(hour, INS)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Internal Room Temp")

#Internal room temperature over multiple term days / weekend
g2 = ggplot(df_term) + geom_point(aes(hour, INS)) + stat_smooth(aes(hour, INS)) + facet_wrap(~ is_weekend) + xlab("Hour of Day") + ylab("Internal Room Temp")

#electric consumption
g3 = ggplot(df_term) + geom_point(aes(hour, elec_consumption, color=is_weekend)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Electric Consumption")

#concrete temp
g4 = ggplot(df_term) + geom_point(aes(hour, concrete_temp, color=is_weekend)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Concrete Temp")

#heat consumption
g5 = ggplot(df_term) + geom_point(aes(hour, heat_consumption, color=is_weekend)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Heat Consumption")

#oat
g6 = ggplot(df_term) + geom_point(aes(hour, OAT)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Outside Air Temperature")


#### Non Term

df_nt = read.csv('df_nonterm.csv')

df_nt$ts = as.POSIXct(df_nt$ts)
df_nt$INS = as.numeric(df_nt$INS)
df_nt$hour = as.numeric(df_nt$hour)
df_nt$month = factor(df_nt$month, levels = c(1,2,3,4,5,12), labels=c('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Dec'))
df_nt$is_weekend = as.factor(df_nt$is_weekend)


g7 = ggplot(df_nt) + geom_point(aes(hour, INS,  color=is_weekend)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Internal Room Temp")

#Internal room temperature over multiple term days / weekend
g8 = ggplot(df_nt) + geom_point(aes(hour, INS)) + facet_wrap(~ is_weekend) + xlab("Hour of Day") + ylab("Internal Room Temp")

#electric consumption
g9 = ggplot(df_nt) + geom_point(aes(hour, elec_consumption, color=is_weekend)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Electric Consumption")

#concrete temp
g10 = ggplot(df_nt) + geom_point(aes(hour, concrete_temp, color=is_weekend)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Concrete Temp")

#heat consumption
g11 = ggplot(df_nt) + geom_point(aes(hour, heat_consumption, color=is_weekend)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Heat Consumption")

#oat
g12 = ggplot(df_nt) + geom_point(aes(hour, OAT)) + facet_wrap( ~ month) + xlab("Hour of Day") + ylab("Outside Air Temperature")


