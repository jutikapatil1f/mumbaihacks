import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";




const { width, height } = Dimensions.get("window");

interface Slide {
  key: string;
  image: any;
  title?: string;
  subtitle?: string;
}

const slides: Slide[] = [
  {
    key: "s1",
    image: require("../../assets/images/slide1.png"),
  },
  {
    key: "s2",
    image: require("../../assets/images/slide2.png"),
    title: "Invest in bonds with 9–12% fixed returns",
    subtitle: "Start with only ₹1,000",
  },
  {
    key: "s3",
    image: require("../../assets/images/slide1.png"),
    title: "Your money. Always within reach. Sell anytime.",
    subtitle: "We'll find buyers for you.",
  },
  {
    key: "s4",
    image: require("../../assets/images/slide2.png"),
    title: "Zero defaults till date",
    subtitle:
      "₹2900+ crores worth bonds sold so far | ₹1800+ crores already repaid",
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / width);
    setIndex(currentIndex);
  };

  const goToNext = () => {
    if (index < slides.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      onGetStarted(); 
    }
  };


  const onGetStarted = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          onMomentumScrollEnd={onScrollEnd}
        >
          {slides.map((slide) => (
            <View style={[styles.slide, { width }]} key={slide.key}>
              <View style={styles.artworkWrap}>
                <Image
                  source={slide.image}
                  style={styles.artwork}
                  resizeMode="contain"
                />
              </View>

              {(slide.title || slide.subtitle) && (
                <View style={styles.textWrap}>
                  {slide.title && <Text style={styles.title}>{slide.title}</Text>}
                  {slide.subtitle && (
                    <Text style={styles.subtitle}>{slide.subtitle}</Text>
                  )}
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.controls}>
          <View style={styles.dotsRow}>
            {slides.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dot,
                  index === i ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>

          <View style={styles.ctaContainer}>
            <TouchableOpacity style={[styles.ctaBtn, { padding: 12 }]} onPress={goToNext}>
              <Feather name="arrow-right-circle" size={28} color="#030301" />
            </TouchableOpacity>
          </View>



        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#030301",
  },
  container: {
    flex: 1,
    backgroundColor: "#030301",
  },
  ctaContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  artworkWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  artwork: {
    width: width * 0.88,
    height: height * 0.45,
  },
  textWrap: {
    marginTop: 20,
    paddingBottom: 30,
  },
  title: {
    color: "#FAFAFA",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#9A9696",
    fontSize: 15,
    lineHeight: 20,
  },
  controls: {
    paddingBottom: 30,
    paddingHorizontal: 22,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 7,
  },
  dotActive: {
    backgroundColor: "#FAFAFA",
    width: 12,
    height: 12,
  },
  dotInactive: {
    backgroundColor: "#9A9696",
  },
  ctaBtn: {
    backgroundColor: "#E7FF57",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginTop: 20,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#030301",
  },
});

