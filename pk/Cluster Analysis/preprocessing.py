import pandas as pd
import glob

# import pandas as pd
# import glob

# ems_files = glob.glob('../../Bowland North Model/ems/cluster/*.csv')

# ems_frame_list = []
# for file_ in ems_files:
#     df = pd.read_csv(file_, header=0)
#     ems_frame_list.append(df)

# ems_df = pd.concat(ems_frame_list)
# print(ems_df.shape)
# print(ems_df.head())

# ems_meta_df = pd.read_csv('../../Bowland North Model/metadata/emsmeta.csv')
# ems_df = ems_df.merge(ems_meta_df, left_on='metadata_id', right_on='id')
# ems_df = ems_df[['timestamp', 'consumption', 'node_id', 'input_collection', 'data_unit']]
# print(ems_df.shape)
# print(ems_df.head())


# -

bms_files = glob.glob('../../Bowland North Model/bms/cluster/*.csv')

bms_frame_list = []
for file_ in bms_files:
    df = pd.read_csv(file_, header=0)
    bms_frame_list.append(df)

bms_df = pd.concat(bms_frame_list)
bms_meta_df = pd.read_csv('../../Bowland North Model/metadata/planonmeters.csv')
bms_meta_df.head()
bms_df = bms_df.merge(bms_meta_df, left_on='device_id', right_on='Logger Asset Code')

print(bms_df.shape)
print(bms_df.head())