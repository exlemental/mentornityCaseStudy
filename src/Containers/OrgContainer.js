import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/organizations'
import { navigate } from '@/Navigators/utils'

const OrgContainer = () => {
  const { Fonts, Gutters, Layout } = useTheme()

  const [organizationName, setOrganizationName] = useState('Netflix')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(organizationName)
  }, [fetchOne, organizationName])
  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.fill, Gutters.smallHPadding]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand width={200} height={100} />
        {(isLoading || isFetching) && <ActivityIndicator />}
        {!isSuccess ? (
          <Text style={Fonts.textRegular}>{error}</Text>
        ) : (
          <>
            <Image
              style={styles.logo}
              source={{
                uri: data.avatar_url,
              }}
            />
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                navigate('Repos')
              }}
            >
              <Text style={Fonts.titleSmall}>{data.name}</Text>
            </TouchableOpacity>
            <Text style={Fonts.textRegular}>(Click org. name for its repos page)</Text>

          </>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  touchable: {
    marginTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 200,
    height: 200,
  },
})

export default OrgContainer
