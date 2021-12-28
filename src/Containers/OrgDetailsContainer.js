import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { useLazyFetchReposQuery } from '@/Services/modules/organizations'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const OrgDetailsContainer = () => {
  const { Fonts, Gutters, Layout, Images } = useTheme()

  const [organizationName, setOrganizationName] = useState('Netflix')
  const [fetchRepos, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchReposQuery()

  useEffect(() => {
    fetchRepos(organizationName)
  }, [fetchRepos, organizationName])
  console.log(data)
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={[[Fonts.titleSmall, Fonts.textCenter, Fonts.textColored]]}>
          {item.full_name}
        </Text>
        <Text style={Fonts.titleSmaller}>Description: </Text>
        <Text style={Fonts.textSmall}>{item.description}</Text>
        <View style={Layout.row}>
          <Text style={Fonts.titleSmaller}>Language: </Text>
          <Text style={Fonts.textSmall}>{item.language}</Text>
        </View>
        <View style={Layout.row}>
          <Text style={Fonts.titleSmaller}>License: </Text>
          <Text style={Fonts.textSmall}>{item.license?.name}</Text>
        </View>
        <View style={Layout.row}>
          <Text style={Fonts.titleSmaller}>Stars Count: </Text>
          <Image style={styles.smallImageStyle} source={Images.fork} />
          <Text style={Fonts.textSmall}>{item.forks_count}</Text>
        </View>
        <View style={Layout.row}>
          <Text style={Fonts.titleSmaller}>Forks Count: </Text>
          <Image style={styles.smallImageStyle} source={Images.star} />
          <Text style={Fonts.textSmall}>{item.stargazers_count}</Text>
        </View>
        <View style={Layout.row}>
          <Text style={Fonts.titleSmaller}>Created at: </Text>
          <Text style={Fonts.textSmall}>{item.created_at}</Text>
        </View>
        <View style={Layout.row}>
          <Text style={Fonts.titleSmaller}>Updated at: </Text>
          <Text style={Fonts.textSmall}>{item.updated_at}</Text>
        </View>
      </View>
    )
  }
  const _keyExtractor = item =>
    item.id ? `${item.id}` : `${item[0] && item[0].id}`

  return (
    <View>
      {(isLoading || isFetching) && <ActivityIndicator />}
      {!isSuccess ? (
        <Text style={Fonts.textRegular}>{error}</Text>
      ) : (
        <>
          <View style={Layout.rowHCenter}>
            <TouchableOpacity
              onPress={() => {
                navigateAndSimpleReset('Main')
              }}
            >
              <Image style={styles.imageStyle} source={Images.backArrow} />
            </TouchableOpacity>
            <Text style={styles.repoFontStyle}>Repositories</Text>
          </View>

          <FlatList
            keyExtractor={_keyExtractor}
            style={styles.list}
            data={data}
            renderItem={_renderItem}
          />
          <View style={[[Layout.colCenter, Gutters.smallHPadding]]} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  touchable: {
    marginTop: 50,
  },
  logo: {
    width: 64,
    height: 64,
  },
  list: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginBottom: 64,
  },
  itemContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    borderColor: '#6e102b',
  },
  imageStyle: {
    width: 48,
    height: 48,
  },
  smallImageStyle: { width: 16, height: 16 },
  repoFontStyle: { fontSize: 32, fontWeight: 'bold' },
})

export default OrgDetailsContainer
