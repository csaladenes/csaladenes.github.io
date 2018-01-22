library(lubridate)
library(car)
library(ggplot2)
library(DAAG)

setwd('D:/Energy Lancaster/Bowland North Model/')

# a little preprocessing
df = read.csv("bn.csv", stringsAsFactors=FALSE)
df$ts = mdy_hm(df$ts)

# energy vectors
df$elec_consumption = as.numeric(df$elec_consumption)
df$heat_consumption = as.numeric(df$heat_consumption)

# time variables
df$hour = hour(df$ts)
df$hour = as.factor(df$hour)

df$month = month(df$ts)
df$month = as.factor(df$month)

# plot
ins.v.elec.plot = ggplot(df, aes(y=INS)) + geom_point(aes(x=elec_consumption, color=hour))

# finding the best fitting interactions model
# first model mr^2 = 0.81
model = lm(INS ~ (elec_consumption + heat_consumption + OAT + is_term_day) * hour * month, data=df)
step(model, direction = "backward")

# second model
# model2 = lm(formula = INS ~ elec_consumption + heat_consumption + OAT + is_term_day + hour +
#               OAT*hour + elec_consumption*hour + heat_consumption*hour + is_term_day*hour, data = df)
# 0.77
model2 = lm(formula = INS ~ elec_consumption + heat_consumption + OAT + 
     is_term_day + hour + month + elec_consumption:hour + is_term_day:hour + 
     elec_consumption:month + heat_consumption:month + OAT:month + 
     is_term_day:month + hour:month, data = df)

step(model2, direction = "backward")

# third model MultR-sq: 0.62
# model3 = lm(formula = INS ~ elec_consumption + heat_consumption + OAT + 
#               is_term_day + hour + OAT:hour, data = df)

model3 = lm(formula = INS ~ elec_consumption + heat_consumption + OAT + 
              is_term_day + hour + month + elec_consumption:hour + is_term_day:hour + 
              elec_consumption:month + heat_consumption:month + OAT:month + 
              is_term_day:month + hour:month, data = df)

# Calculate hour-specific intercepts
intercepts = c(coef(model3)["(Intercept)"],
               coef(model3)["(Intercept)"] + coef(model3)["hour1"],
               coef(model3)["(Intercept)"] + coef(model3)["hour2"],
               coef(model3)["(Intercept)"] + coef(model3)["hour3"],
               coef(model3)["(Intercept)"] + coef(model3)["hour4"],
               coef(model3)["(Intercept)"] + coef(model3)["hour5"],
               coef(model3)["(Intercept)"] + coef(model3)["hour6"],
               coef(model3)["(Intercept)"] + coef(model3)["hour7"],
               coef(model3)["(Intercept)"] + coef(model3)["hour8"],
               coef(model3)["(Intercept)"] + coef(model3)["hour9"],
               coef(model3)["(Intercept)"] + coef(model3)["hour10"],
               coef(model3)["(Intercept)"] + coef(model3)["hour11"],
               coef(model3)["(Intercept)"] + coef(model3)["hour12"],
               coef(model3)["(Intercept)"] + coef(model3)["hour13"],
               coef(model3)["(Intercept)"] + coef(model3)["hour14"],
               coef(model3)["(Intercept)"] + coef(model3)["hour15"],
               coef(model3)["(Intercept)"] + coef(model3)["hour16"],
               coef(model3)["(Intercept)"] + coef(model3)["hour17"],
               coef(model3)["(Intercept)"] + coef(model3)["hour18"],
               coef(model3)["(Intercept)"] + coef(model3)["hour19"],
               coef(model3)["(Intercept)"] + coef(model3)["hour20"],
               coef(model3)["(Intercept)"] + coef(model3)["hour21"],
               coef(model3)["(Intercept)"] + coef(model3)["hour22"],
               coef(model3)["(Intercept)"] + coef(model3)["hour23"])

write.csv(intercepts, "intercepts.csv")

intercepts.plot = ggplot(as.data.frame(intercepts)) + geom_line(aes(x=c(0:23), y=intercepts)) +
                  xlab("Hour of Day") + ylab("Intercepts")

oat_coef = model3$coefficients[29:length(model3$coefficients)]

cv.lm(df, model3, m=10)

# Anova(model3)
# lines.df <- data.frame(intercepts = intercepts,
#                        slopes = rep(coef(model3)["mother.age"], 3),
#                        race = levels(birthwt$race))
# 
# qplot(x = mother.age, y = birthwt.grams, color = race, data = birthwt) +
#   geom_abline(aes(intercept = intercepts,
#                   slope = slopes,
#                   color = race), data = lines.df)



# mod1 = lm(INS ~ heat_consumption*is_term_day, data=bn_df) 
# tmp = summary(mod1)
# > names(tmp)
# names(mod1)
# [1] "coefficients"  "residuals"     "effects"       "rank"          "fitted.values" "assign"        "qr"           
# [8] "df.residual"   "xlevels"       "call"          "terms"         "model"        
# > mod1$coefficients
# 
# #book: MASS