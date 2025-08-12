import { GestureResponderEvent, Pressable, StyleSheet, useColorScheme } from "react-native"
import { ThemedText } from "./ThemedText"

interface IYongziStrokes {
  id: number,
  chinese: string,
  pinyin: string,
  description: string,
  image: string
}

const yongzi_strokes = [
  {
    id: 1,
    chinese: "点",
    pinyin: "diǎn",
    description: "точка",
    image: ""
  },
  {
    id: 2,
    chinese: "横",
    pinyin: "héng",
    description: "горизонтальная черта",
    image: ""
  },
  {
    id: 3,
    chinese: "竖",
    pinyin: "shù",
    description: "вертикальная черта",
    image: ""
  },
  {
    id: 4,
    chinese: "钩",
    pinyin: "gōu",
    description: "крючок, присоединяется к другим чертам, резко падает и уходит влево",
    image: ""
  },
  {
    id: 5,
    chinese: "提",
    pinyin: "tí",
    description: "восходящая черта",
    image: ""
  },
  {
    id: 6,
    chinese: "弯",
    pinyin: "wān",
    description: "изогнутая откидная влево, сужает толщину, наносится быстро",
    image: ""
  },
  {
    id: 7,
    chinese: "撇",
    pinyin: "piě",
    description: "откидная влево с небольшим изгибом",
    image: ""
  },
  {
    id: 8,
    chinese: "捺",
    pinyin: "nà",
    description: "откидная вправо с острым концом",
    image: ""
  }
]

export const YongziTable = (onRow: ((event: GestureResponderEvent) => void) | null | undefined) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const styles = getStyles(isDark);
  return (
    <>
    {yongzi_strokes.map((item: IYongziStrokes) => {
    return (
      <Pressable key={item.id} style={styles.row} onPress={onRow}>
        <ThemedText style={[styles.cell, styles.cell1]}>{item.id}</ThemedText>
        <ThemedText style={[styles.cell, styles.cell2]}>{item.chinese}</ThemedText>
        <ThemedText type="default" style={[styles.cell, styles.cell3]}>{item.description}</ThemedText>
        <ThemedText style={[styles.cell, styles.cell4]}>{item.image}</ThemedText>
      </Pressable>
    )
    })}
    </>
  )
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: isDark ? 1 : 2.5,
    borderColor: isDark ? '#272f3a' : '#cccc99',
    borderRadius: 40,
    flex: 1,
    overflow: 'hidden',
    backgroundColors: isDark ? '#010606' : '#fff6e4',
    shadowColor: isDark ? '#ffffff' : '#fce7c5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
    height: 100,
    alignItems: 'stretch',
  },
  cell1: {
    flex: 0.5,
    paddingLeft: 15,
    textAlign: 'center',
    backgroundColors: isDark ? '#272f3a' : '#fee8c5',
    paddingTop: '10%',
  },
  cell2: {
    flex: 1.2,
    backgroundColors: isDark ? '#272f3a' : '#fee8c5',
    borderBottomRightRadius: 40,
    paddingTop: '10%'
  },
  cell3: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 32,
  },
  cell4: {
    flex: 2.1,
    textAlign: 'right',
    backgroundColors: isDark ? '#0e1211' : '#f2e7c5',
    paddingRight: 20,
    paddingLeft: 10,
    borderTopLeftRadius: 40,
    shadowColor: '#fffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,  
    elevation: 5
  },
  cell: {
    textAlign: 'center',
    paddingVertical: 10,
  },
})
