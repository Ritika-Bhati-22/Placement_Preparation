export const DSA_DATA: Record<number, {
  t: string; s: string; diff: string;
  topic: string; p: string; c: string;
}> = {
  1: {
    t: "Two Sum", s: "Array · HashMap · Easy",
    diff: "easy", topic: "Array",
    p: "Given an array of integers nums and a target, return indices of the two numbers that add up to target.\n\nExample: nums = [2,7,11,15], target = 9 → Output: [0,1]",
    c: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`
  },
  2: {
    t: "Longest Substring", s: "String · Sliding Window · Medium",
    diff: "medium", topic: "String",
    p: "Find the length of the longest substring without repeating characters.\n\nExample: s = 'abcabcbb' → Output: 3",
    c: `def length_of_longest_substring(s):
    char_set = set()
    left = max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`
  },
  3: {
    t: "Binary Search", s: "Array · Binary Search · Easy",
    diff: "easy", topic: "Array",
    p: "Given a sorted array and target, return index of target. If not found, return -1.\n\nExample: nums = [-1,0,3,5,9,12], target = 9 → Output: 4",
    c: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1`
  },
  4: {
    t: "Maximum Subarray", s: "DP · Kadane's · Medium",
    diff: "medium", topic: "DP",
    p: "Find the contiguous subarray with the largest sum.\n\nExample: nums = [-2,1,-3,4,-1,2,1,-5,4] → Output: 6",
    c: `def max_subarray(nums):
    max_sum = current = nums[0]
    for num in nums[1:]:
        current = max(num, current + num)
        max_sum = max(max_sum, current)
    return max_sum`
  },
  5: {
    t: "Merge K Sorted Lists", s: "Heap · LinkedList · Hard",
    diff: "hard", topic: "LinkedList",
    p: "Given k sorted linked-lists, merge them into one sorted linked-list.\n\nExample: [[1,4,5],[1,3,4],[2,6]] → Output: [1,1,2,3,4,4,5,6]",
    c: `import heapq
def merge_k_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node: heapq.heappush(heap, (node.val, i, node))
    dummy = curr = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node; curr = curr.next
        if node.next: heapq.heappush(heap,(node.next.val,i,node.next))
    return dummy.next`
  },
  6: {
    t: "Valid Parentheses", s: "Stack · Easy",
    diff: "easy", topic: "Stack",
    p: 'Given a string of brackets, determine if it is valid.\n\nExample: s = "()[]{}" → Output: true',
    c: `def is_valid(s):
    stack = []
    mapping = {')':'(', '}':'{', ']':'['}
    for c in s:
        if c in mapping:
            if not stack or mapping[c] != stack.pop(): return False
        else: stack.append(c)
    return not stack`
  },
};

export const DIFF_COLORS: Record<string, string> = {
  easy: "#10D98C",
  medium: "#F59E0B",
  hard: "#F25252",
};