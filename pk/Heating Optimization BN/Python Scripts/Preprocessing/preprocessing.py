import pandas as pd
import glob

# Get all data files
bms_files = glob.glob('./bms/*.csv')

# Filter the device ID which contains the meter I'm interested in alone 
bms_frame_list = []
for file_ in bms_files:
    df = pd.read_csv(file_, header=0)
    df = df[df['device_id'] == '{A7B8544A-F5AF-40B3-BBBB-46E7C72A6D4D}'] 
    df = df[df['module_key'] == 'S1'] 
    bms_frame_list.append(df)

# Save all the outside air temperature to a data frame   
bms_df = pd.concat(bms_frame_list)
bms_df.to_csv('./output/oat_data.csv')

bms_frame_list = []
for file_ in bms_files:
    df = pd.read_csv(file_, header=0)
    df = df[df['device_id'] == '{A7B8544A-F5AF-40B3-BBBB-46E7C72A6D4D}'] 
    df = df[df['module_key'] == 'S12'] 
    bms_frame_list.append(df)


bms_df = pd.concat(bms_frame_list)
bms_df.to_csv('./output/ins_data.csv')

ems_files = glob.glob('./ems/*.csv')

ems_frame_list = []
for file_ in ems_files:
    df = pd.read_csv(file_, header=0)
    df = df[df['metadata_id'] == 102]
    ems_frame_list.append(df)

ems_df = pd.concat(ems_frame_list)
ems_df.to_csv('./output/ems_electric.csv')

ems_frame_list = []
for file_ in ems_files:
    df = pd.read_csv(file_, header=0)
    df = df[df['metadata_id'] == 104]
    ems_frame_list.append(df)

ems_df = pd.concat(ems_frame_list)
ems_df.to_csv('./output/ems_heat.csv')


###
# The files from the above procedure were joined by date/hour in Tableau and Excel
###

