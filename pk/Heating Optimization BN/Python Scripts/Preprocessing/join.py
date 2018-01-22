import pandas as pd
import glob

###
# Join procedure
###
im_frames = []
im_files = glob.glob('./intermediary/*.csv')
for file_ in im_files:
     df = pd.read_csv(file_, header=0)
     df['ts'] = df['Day'].astype(str) + " " + df['Month'].astype(str) + " " + df['Year'].astype(str) + " " + df['Hour'].astype(str) + ":00:00"
     df['ts'] = pd.to_datetime(df['ts'])
     im_frames.append(df)

for i in range(len(im_frames)):
    im_frames[i] = im_frames[i].iloc[:,4:]

# print(im_frames[1].head())
# print(im_frames[-2].tail())

df1 = pd.merge(pd.merge(im_frames[0], im_frames[1], on='ts'), im_frames[2], on='ts')
df2 = pd.merge(pd.merge(im_frames[3], im_frames[4], on='ts'), pd.merge(im_frames[5], im_frames[6], on='ts'), on='ts')
df = pd.merge(df1, df2, on='ts')

# factor in weekends
df['is_weekend'] = df['ts'].dt.dayofweek >= 5
df['is_weekend'] = df['is_weekend'].map({True : 1, False : 0})

# Factor in term dates
# df['is_term_day_m'] = df['ts'] > pd.to_datetime('17/12/2016')
# df['is_term_day_m'] = df['ts'] < pd.to_datetime('13/01/2017')

df['is_term_day_m'] = df['ts'] < pd.to_datetime('17/12/2016')

df['is_term_day_l'] = df['ts'] > pd.to_datetime('13/01/2017')
df['is_term_day_l'] = df['ts'] < pd.to_datetime('24/03/2017')

df['is_term_day_s'] = df['ts'] > pd.to_datetime('21/04/2017')
df['is_term_day_s'] = df['ts'] < pd.to_datetime('30/06/2017')

df['is_term_day'] = df['is_term_day_m'] & df['is_term_day_s'] & df['is_term_day_l']
df['is_term_day'] = df['is_term_day'].map({True : 1, False : 0})
#df = df[['ts','Device_ID_x','Module_Key_x','Device_ID_y','Module_Key_y','elec_consumption','heat_consumption','OAT','air_temp','concrete_temp','temp','is_weekend','is_term_day', 'INS']]
df = df[['ts','elec_consumption','heat_consumption','OAT','air_temp','concrete_temp','temp','is_weekend','is_term_day', 'INS']]

df.to_csv('./output/final_dataset.csv')
print(df.head())